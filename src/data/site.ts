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

export const apps = [
  {
    slug: 'utility-assistant',
    name: 'Utility Assistant',
    status: 'In development',
    summary:
      'A small app for keeping household utility readings, bills, and usage notes easier to track over time.',
    description:
      'Utility Assistant helps you keep utility providers, bills, meter readings, weather context, and home timeline events in one place so usage changes are easier to understand.',
    audience: 'Household utility tracking',
    updated: 'August 30, 2026',
    appStoreUrl: 'https://apps.apple.com/',
    images: [
      {
        src: '/apps/utility-assistant/screenshots/01-today-insights.jpg',
        alt: 'Utility Assistant Today screen showing bill insights',
      },
      {
        src: '/apps/utility-assistant/screenshots/02-cost-and-usage-timeline.jpg',
        alt: 'Utility Assistant timeline showing cost and usage trends',
      },
      {
        src: '/apps/utility-assistant/screenshots/03-weather-and-meter-timeline.jpg',
        alt: 'Utility Assistant timeline showing weather and meter readings',
      },
      {
        src: '/apps/utility-assistant/screenshots/04-bills-and-new-bill.jpg',
        alt: 'Utility Assistant bills screen and new bill entry',
      },
      {
        src: '/apps/utility-assistant/screenshots/05-manage-locations.jpg',
        alt: 'Utility Assistant manage locations screen',
      },
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
