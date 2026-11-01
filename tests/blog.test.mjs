import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

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
    writeFileSync(join(fixtures, 'long.md'),
      '---\ntitle: Long fixture\ndescription: TOC and callouts\npubDate: "2026-01-01"\n---\n' +
      body + '\n### Nested detail\n\nDetails.\n\n## Second section\n\nMore.\n\n## A section\n\n' +
      '<aside class="fix-callout" aria-label="Fix"><p><strong>Fix:</strong> Keep this advice visible.</p></aside>\n');
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
    assert.ok(!page.includes('data-blog-toc'), 'Short posts should omit the TOC');
    const longPage = read(`dist/blog/${id}/long/index.html`);
    assert.ok(longPage.includes('data-blog-toc'));
    assert.ok(longPage.includes('class="mobile-toc"'));
    for (const match of longPage.matchAll(/<nav[^>]*aria-label="On this page"[^>]*>([\s\S]*?)<\/nav>/g)) {
      const links = [...match[1].matchAll(/href="#([^"]+)"/g)];
      assert.equal(links.length, 3, 'TOC includes only level-two headings');
      assert.equal(new Set(links.map((link) => link[1])).size, 3, 'Repeated headings have distinct anchors');
      for (const link of links) assert.ok(longPage.includes(`id="${link[1]}"`));
    }
    assert.ok(longPage.includes('class="fix-callout"'));
    assert.ok(longPage.includes('<strong>Fix:</strong> Keep this advice visible.'));

    // Exercise the shipped highlighting script without controlling a browser.
    const script = [...longPage.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)]
      .map((match) => match[1]).find((code) => code.includes('data-blog-toc'));
    assert.ok(script, 'The TOC highlighting script is shipped');
    const headingIds = ['first', 'second', 'third'];
    let positions = [200, 500, 900];
    const headings = headingIds.map((id, i) => ({ id, getBoundingClientRect: () => ({ top: positions[i] }) }));
    const links = [...headingIds, ...headingIds].map((id) => ({
      hash: `#${id}`, attributes: {},
      setAttribute(key, value) { this.attributes[key] = value; },
      removeAttribute(key) { delete this.attributes[key]; },
    }));
    const events = {};
    let pendingFrame;
    const toc = { dataset: {}, querySelectorAll: () => links };
    const document = {
      querySelector: () => toc,
      getElementById: (id) => headings.find((heading) => heading.id === id),
      documentElement: { scrollHeight: 2100 },
      addEventListener: (event, callback) => { events[event] = callback; },
    };
    const window = {
      scrollY: 0, innerHeight: 800,
      addEventListener: (event, callback) => { events[event] = callback; },
    };
    runInNewContext(script, {
      document, window, AbortController,
      requestAnimationFrame: (callback) => { pendingFrame = callback; return 1; },
      cancelAnimationFrame: () => {},
    });
    const activeLinks = () => links.filter((link) => link.attributes['aria-current'] === 'location').map((link) => link.hash);
    assert.deepEqual(activeLinks(), ['#first', '#first']);
    positions = [-400, 20, 400];
    events.scroll(); pendingFrame();
    assert.deepEqual(activeLinks(), ['#second', '#second']);
    window.scrollY = 1300;
    events.scroll(); pendingFrame();
    assert.deepEqual(activeLinks(), ['#third', '#third']);
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
