import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (path) => readFileSync(join(root, path), 'utf8');

function build(shouldPass = true) {
  const result = spawnSync('npm', ['run', 'build'], {
    cwd: root,
    encoding: 'utf8',
    timeout: 60_000,
  });
  assert.ifError(result.error);
  const output = `${result.stdout}\n${result.stderr}`;
  if (shouldPass) assert.equal(result.status, 0, output);
  else {
    assert.notEqual(result.status, 0, 'Invalid frontmatter must fail the build');
    assert.match(output, /pubDate|Invalid date/i);
  }
}

test('blog builds Markdown, sorts posts, excludes drafts, and removes deleted posts', () => {
  const contentDir = join(root, 'src/content/blog');
  mkdirSync(contentDir, { recursive: true });
  const fixtures = mkdtempSync(join(contentDir, 'verify-blog-'));
  const id = basename(fixtures).toLowerCase();
  const body = '\n## A section\n\nText with **emphasis**.\n\n> A quote.\n\n```js\nconst value = 42;\n```\n';
  try {
    const posts = [
      ['older', 'Older fixture', '2026-01-01', false],
      ['newer', 'Newer & <special> fixture', '2026-02-01', false],
      ['private', 'Private fixture', '2026-03-01', true],
    ];
    for (const [name, title, date, draft] of posts) {
      writeFileSync(join(fixtures, `${name}.md`),
        `---\ntitle: "${title}"\ndescription: "Summary with & characters."\npubDate: "${date}"\ndraft: ${draft}\n---\n${body}`);
    }
    build();
    const index = read('dist/blog/index.html');
    const rss = read('dist/rss.xml');
    const newerLink = `/blog/${id}/newer/`;
    const olderLink = `/blog/${id}/older/`;
    assert.ok(index.indexOf(newerLink) >= 0);
    assert.ok(index.indexOf(newerLink) < index.indexOf(olderLink));
    assert.ok(rss.indexOf(newerLink) >= 0);
    assert.ok(rss.indexOf(newerLink) < rss.indexOf(olderLink));
    assert.ok(!index.includes('Private fixture'));
    assert.ok(!rss.includes('Private fixture'));
    assert.ok(!existsSync(join(root, `dist/blog/${id}/private/index.html`)));
    assert.ok(rss.includes('<title>Newer &amp; &lt;special&gt; fixture</title>'));
    assert.ok(rss.includes(`https://smalltechstack.com${newerLink}`));
    const page = read(`dist/blog/${id}/newer/index.html`);
    for (const marker of ['<h2 id="a-section">', '<strong>emphasis</strong>', '<blockquote>', '<pre', 'February 1, 2026', 'application/rss+xml']) {
      assert.ok(page.includes(marker), `Missing ${marker}`);
    }
    assert.ok(page.includes(`https://smalltechstack.com${newerLink}`));
    writeFileSync(join(fixtures, 'invalid.md'),
      '---\ntitle: Invalid\ndescription: Schema check\npubDate: not-a-date\n---\n');
    build(false);
  } finally {
    rmSync(fixtures, { recursive: true, force: true });
    // A second build must remove deleted entries even when the collection is empty.
    build();
  }
  assert.ok(!read('dist/blog/index.html').includes(`/blog/${id}/`));
  assert.ok(!read('dist/rss.xml').includes(`/blog/${id}/`));
  assert.ok(!existsSync(join(root, `dist/blog/${id}`)));
});
