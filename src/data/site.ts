export const company = {
  name: 'Small Tech Stack',
  legalName: 'Small Tech Stack',
  domain: 'smalltechstack.com',
  email: 'hello@smalltechstack.com',
  tagline: 'Technology for the little guy.',
  description:
    'Small Tech Stack keeps a small public home for volunteer nonprofit IT work, simple software projects, and related policy pages.',
};

export const focusAreas = [
  'Diversity and inclusion',
  'Education',
  'Environment',
  'Human rights',
  'Human services',
  'Gender equity and justice',
  'LGBTQ+',
  'Other similarly progressive issues',
];

export const services = [
  {
    title: 'Web Presence',
    summary:
      'Small websites and pages for basic nonprofit information, forms, updates, and contact details.',
  },
  {
    title: 'Automation',
    summary:
      'Small workflow fixes for repeated notes, reminders, spreadsheets, forms, and handoffs.',
  },
  {
    title: 'Custom Software',
    summary:
      'Tiny tools, dashboards, and app-shaped projects for a specific need, when off-the-shelf tools are awkward.',
  },
  {
    title: 'Technical Stewardship',
    summary:
      'Notes, cleanup, backups, vendor lists, and maintenance for systems that need to be easier for volunteers to manage.',
  },
];

export const process = [
  'Start with what the organization already has.',
  'Keep the next step small enough to finish.',
  'Write down what changed and where things live.',
  'Adjust slowly as people actually use the system.',
];

export const projects = [
  {
    slug: 'product-starter',
    name: 'Product Starter',
    status: 'Policy template',
    summary:
      'A reusable project profile for future Small Tech Stack apps and tools, including privacy, terms, and support pages.',
    audience: 'Small nonprofit software projects',
    updated: 'August 30, 2026',
  },
];

export interface PortfolioApp {
  slug: string;
  name: string;
  summary: string;
  description: string;
  audience: string;
  status: string;
  updated: string;
  icon: string;
  appStoreUrl?: string;
  primaryLink: { label: string; href: string };
  platforms: string;
  availability: string;
  note?: string;
  features: { title: string; description: string }[];
  images: { src: string; alt: string; width: number; height: number; caption: string }[];
  screenshotNote?: string;
  links: { label: string; href: string }[];
}

export const apps: PortfolioApp[] = [
  {
    slug: 'utility-assistant',
    name: 'Utility Assistant',
    summary:
      'A small app for keeping household utility readings, bills, and usage notes easier to track over time.',
    description:
      'Utility Assistant helps you keep utility providers, bills, meter readings, weather context, and home timeline events in one place so usage changes are easier to understand.',
    audience: 'Household utility tracking',
    status: 'Available on the App Store',
    updated: 'September 17, 2026',
    appStoreUrl: 'https://apps.apple.com/app/utility-assistant/id6808051910',
    icon: '/apps/utility-assistant/icon.png',
    primaryLink: { label: 'Download on the App Store', href: 'https://apps.apple.com/app/utility-assistant/id6808051910' },
    platforms: 'iPhone',
    availability: 'Available on the App Store.',
    features: [
      { title: 'Keep bills together', description: 'Save billing periods, due dates, totals, line items, and notes in one place.' },
      { title: 'Follow meter readings', description: 'Track manual readings and readings captured from bills over time.' },
      { title: 'Put usage in context', description: 'Compare usage with ZIP-code weather history, heating days, and cooling days.' },
      { title: 'Remember what changed', description: 'Mark changes in occupancy, appliances, rates, and other home events alongside your usage.' },
    ],
    links: [
      { label: 'Documentation', href: '/apps/utility-assistant/docs/' },
      { label: 'Privacy policy', href: '/apps/utility-assistant/privacy/' },
      { label: 'Support', href: 'mailto:hello@smalltechstack.com' },
    ],
    images: [
      {
        src: '/apps/utility-assistant/screenshots/01-today-insights.jpg',
        alt: 'Utility Assistant Today screen showing bill insights',
        width: 1290,
        height: 2796,
        caption: 'Today and insights',
      },
      {
        src: '/apps/utility-assistant/screenshots/02-cost-and-usage-timeline.jpg',
        alt: 'Utility Assistant timeline showing cost and usage trends',
        width: 1290,
        height: 2796,
        caption: 'Cost and usage over time',
      },
      {
        src: '/apps/utility-assistant/screenshots/03-weather-and-meter-timeline.jpg',
        alt: 'Utility Assistant timeline showing weather and meter readings',
        width: 1290,
        height: 2796,
        caption: 'Weather and meter readings',
      },
      {
        src: '/apps/utility-assistant/screenshots/04-bills-and-new-bill.jpg',
        alt: 'Utility Assistant bills screen and new bill entry',
        width: 1290,
        height: 2796,
        caption: 'Bills and bill entry',
      },
      {
        src: '/apps/utility-assistant/screenshots/05-manage-locations.jpg',
        alt: 'Utility Assistant manage locations screen',
        width: 1290,
        height: 2796,
        caption: 'Manage locations',
      },
    ],
  },
  {
    slug: 'apex-development-map',
    name: 'Apex Simple Development Map',
    summary: 'Explore what is planned and being built in Apex, North Carolina.',
    description: 'Find development projects and planning cases near you, see their boundaries, and browse town documents one page at a time—especially on your phone.',
    audience: 'Apex residents and anyone following local development',
    status: 'Web app',
    updated: 'October 19, 2026',
    icon: '/apps/apex-development-map/icon.png',
    primaryLink: { label: 'Open the map', href: 'https://map.apexnc.info/' },
    platforms: 'Web · desktop and mobile browsers',
    availability: 'Use it in your browser or add it to your phone’s home screen. An internet connection is required.',
    note: 'An independent community project, unaffiliated with the Town of Apex. Saved town data is refreshed daily when possible; original town records remain the official source.',
    features: [
      { title: 'Find what is happening nearby', description: 'Pan around Apex or search by project name or street address to find planning cases in an area you know.' },
      { title: 'See the full project', description: 'Explore project footprints, filter planning categories and statuses, and turn town and planning-jurisdiction boundaries on or off.' },
      { title: 'Read documents on your phone', description: 'Browse full document pages without downloading a large PDF, with links back to the original town documents.' },
      { title: 'Catch up on changes', description: 'Review newly detected projects and changes to project details and documents.' },
    ],
    images: [],
    links: [
      { label: 'Support', href: 'https://www.linkedin.com/in/brianadkins' },
      { label: 'Source code', href: 'https://github.com/brianadkins/ApexDevelopmentMapCompanion' },
      { label: 'Town of Apex Planning', href: 'https://apexnc.org/217' },
    ],
  },
  {
    slug: 'what-were-we-watching',
    name: 'What Were We Watching?',
    summary: 'Keep track of TV and movies, on your own or with your favorite people.',
    description: 'Keep separate watchlists and viewing progress for yourself, your partner, family, or friends. See your next episode, plan movie night, and find where to watch.',
    audience: 'People who watch alone and together',
    status: 'Web app · iPhone app in development',
    updated: 'October 19, 2026',
    icon: '/apps/what-were-we-watching/icon.png',
    primaryLink: { label: 'Open the web app', href: 'https://whatwerewewatching.app/' },
    platforms: 'Web · iPhone app in development',
    availability: 'The web app is available now. The iPhone app is in development and is not yet listed on the App Store.',
    features: [
      { title: 'Pick up where you left off', description: 'Up Next brings together next episodes, upcoming air dates, and caught-up shows, with progress saved separately for each list.' },
      { title: 'Watch with different people', description: 'Keep personal and shared TV and movie lists. Invite others to edit a list or follow it with view-only access.' },
      { title: 'Make movie night easier', description: 'Keep Want to watch, Watched, and Dropped movies together, with priorities and shared watched status.' },
      { title: 'Watch at your own pace', description: 'See your preferred streaming services, explore season and episode details, or wait until a full season has aired. Streaming availability uses US listings.' },
    ],
    screenshotNote: 'Screenshots show the iPhone app in development.',
    images: [
      { src: '/apps/what-were-we-watching/screenshots/01-up-next.png', alt: 'Up Next showing the next unwatched episode, streaming service, and season progress', width: 1206, height: 2622, caption: 'Your next episode' },
      { src: '/apps/what-were-we-watching/screenshots/02-tv-lists.png', alt: 'Personal and shared TV lists with separate groups of viewers', width: 1206, height: 2622, caption: 'Lists for your people' },
      { src: '/apps/what-were-we-watching/screenshots/03-movie-list.png', alt: 'Favorite Movies list with streaming providers and Mark watched controls', width: 1206, height: 2622, caption: 'Plan movie night' },
      { src: '/apps/what-were-we-watching/screenshots/04-series-details.png', alt: 'Series details with watched episode ratings and a Wait for full season option', width: 1206, height: 2622, caption: 'Explore seasons and episodes' },
      { src: '/apps/what-were-we-watching/screenshots/05-coming-up.png', alt: 'Coming up showing future episodes and their air dates', width: 1206, height: 2622, caption: 'See what is coming up' },
      { src: '/apps/what-were-we-watching/screenshots/06-caught-up.png', alt: 'Caught up and completed shows awaiting news about future episodes', width: 1206, height: 2622, caption: 'Know when you are caught up' },
    ],
    links: [
      { label: 'Support', href: 'mailto:hello@whatwerewewatching.app' },
      { label: 'Privacy policy', href: 'https://whatwerewewatching.app/privacy/' },
      { label: 'Release notes', href: 'https://whatwerewewatching.app/release-notes/' },
      { label: 'Source code', href: 'https://github.com/brianadkins/whatarewewatching' },
    ],
  },
];

export const pastNonprofits = [
  {
    name: 'Adaptive Training Foundation',
    category: 'Military and veterans affairs',
    location: 'Carrollton, TX',
  },
  { name: 'Apex Public School Foundation', category: 'Education', location: 'Apex, NC' },
  { name: 'Backbone Campaign', category: 'Civil rights, environment', location: 'Vashon, WA' },
  { name: 'BACKBONES', category: 'Human services', location: 'Prospect Heights, IL' },
  { name: 'CharityWatch', category: 'Education', location: 'Chicago, IL' },
  { name: 'Education For All Children', category: 'Education', location: 'Portsmouth, NH' },
  { name: 'Family Engagement Lab', category: 'Education', location: 'San Francisco, CA' },
  { name: 'Filling In The Blanks', category: 'Human services', location: 'Norwalk, CT' },
  { name: 'JerseySTEM', category: 'Education', location: 'Florham Park, NJ' },
  {
    name: 'MOSTe Motivating Our Students Through Experience',
    category: 'Education',
    location: 'Los Angeles, CA',
  },
  { name: 'The Theater Project', category: 'Arts and culture', location: 'Union, NJ' },
  { name: 'Laguna Food Pantry', category: 'Human services', location: 'Laguna Beach, CA' },
  { name: 'LavaMaeX', category: 'Human services', location: 'San Francisco, CA' },
  {
    name: 'Lyme Disease Resource Center, Inc.',
    category: 'Human services',
    location: 'Northampton, MA',
  },
  {
    name: 'New Jersey Environmental Justice Alliance',
    category: 'Environment',
    location: 'Newark, NJ',
  },
  {
    name: 'Sin Barreras Without Barriers Inc.',
    category: 'Human services',
    location: 'Charlottesville, VA',
  },
  {
    name: 'Transgender Gender-Variant & Intersex Justice Project',
    category: 'Human rights',
    location: 'San Francisco, CA',
  },
  { name: 'WildTrack', category: 'Environment, animals', location: 'Durham, NC' },
  {
    name: 'Yellowstone to Yukon Conservation Initiative',
    category: 'Environment, animals',
    location: 'Canmore, AB / Bozeman, MT',
  },
];
