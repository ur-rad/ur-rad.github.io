# Multi-Conference Architecture Options for UR-RAD

This document outlines various approaches for scaling the UR-RAD website to support multiple conferences, years, and venues while maintaining code reusability and allowing for conference-specific customization.

## Current Situation

The UR-RAD website is currently built as a single Astro application for UR-RAD 2025. The site includes:
- Static pages (Home, Call for Papers, Speakers, Program, Organizers)
- Component-based architecture with reusable UI elements
- Tailwind CSS for styling with custom design system
- Asset management for speaker/organizer photos
- GitHub Pages deployment

## Requirements for Multi-Conference Support

1. **URL Structure**: Support URLs like `ur-rad.github.io/fss_2025`, `ur-rad.github.io/icra_2026`, etc.
2. **Code Reuse**: Maximize shared components, layouts, and styling
3. **Customization**: Allow conference-specific theming, content, and features
4. **Scalability**: Easy addition of new conferences without major refactoring
5. **Maintainability**: Single codebase preferred over multiple repositories
6. **SEO**: Proper routing and meta tags for each conference
7. **Hub Site**: Main landing page showcasing all conferences

## Option 1: Multi-Conference Content Collections (RECOMMENDED)

This approach uses Astro's native content collections to manage different conferences while maintaining a single, flexible codebase.

### Architecture Overview

```
src/
├── content/
│   ├── conferences/           # Conference definitions
│   │   ├── fss-2025.md
│   │   ├── icra-2026.md
│   │   └── iros-2027.md
│   ├── speakers/             # Speakers organized by conference
│   │   ├── fss-2025/
│   │   ├── icra-2026/
│   │   └── iros-2027/
│   ├── organizers/           # Organizers by conference
│   │   ├── fss-2025/
│   │   └── shared/           # Cross-conference organizers
│   └── config.ts            # Content type definitions
├── pages/
│   ├── index.astro          # Main hub page
│   ├── [conference]/        # Dynamic conference routes
│   │   ├── index.astro      # Conference home
│   │   ├── call-for-papers.astro
│   │   ├── speakers.astro
│   │   ├── program.astro
│   │   └── organizers.astro
│   └── api/                 # API routes for data
├── components/
│   ├── Conference/          # Conference-specific components
│   │   ├── ConferenceNav.astro
│   │   ├── ConferenceHero.astro
│   │   └── ConferenceFooter.astro
│   ├── Shared/              # Reusable components
│   └── UI/                  # Base UI components
├── layouts/
│   ├── Base.astro           # Base layout
│   ├── ConferenceLayout.astro # Conference-specific layout
│   └── HubLayout.astro      # Main hub layout
└── styles/
    ├── global.css           # Global styles
    ├── conferences/         # Conference-specific themes
    │   ├── fss.css
    │   └── icra.css
    └── components/          # Component styles
```

### Content Collections Schema

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const conferences = defineCollection({
  type: 'content',
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    subtitle: z.string(),
    venue: z.string(),
    year: z.number(),
    dates: z.object({
      start: z.string(),
      end: z.string(),
    }),
    location: z.object({
      venue: z.string(),
      city: z.string(),
      country: z.string(),
    }),
    theme: z.object({
      primary: z.string(),
      secondary: z.string(),
      accent: z.string(),
    }),
    urls: z.object({
      registration: z.string().optional(),
      submission: z.string().optional(),
      venue: z.string().optional(),
    }),
    importantDates: z.object({
      round1: z.object({
        submission: z.string(),
        cameraReady: z.string(),
      }).optional(),
      round2: z.object({
        abstract: z.string().optional(),
        submission: z.string(),
        cameraReady: z.string(),
      }).optional(),
    }),
    status: z.enum(['upcoming', 'current', 'past']),
    featured: z.boolean().default(false),
  }),
});

const speakers = defineCollection({
  type: 'content',
  schema: z.object({
    conference: z.string(),
    name: z.string(),
    title: z.string(),
    affiliation: z.string(),
    bio: z.string(),
    photo: z.string(),
    website: z.string().optional(),
    keynote: z.boolean().default(false),
    order: z.number().optional(),
  }),
});

const organizers = defineCollection({
  type: 'content',
  schema: z.object({
    conference: z.array(z.string()), // Can organize multiple conferences
    name: z.string(),
    affiliation: z.string(),
    role: z.string().optional(),
    photo: z.string(),
    website: z.string().optional(),
    email: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = {
  conferences,
  speakers,
  organizers,
};
```

### Conference Definition Example

```markdown
---
# src/content/conferences/fss-2025.md
slug: "fss_2025"
title: "UR-RAD 2025"
subtitle: "The 3rd AAAI Fall Symposium on Unifying Representations for Robot Application Development"
venue: "AAAI Fall Symposium Series"
year: 2025
dates:
  start: "2025-11-06"
  end: "2025-11-08"
location:
  venue: "Westin Arlington Gateway"
  city: "Arlington, VA"
  country: "USA"
theme:
  primary: "#2563eb"
  secondary: "#1d4ed8"
  accent: "#f59e0b"
urls:
  registration: "https://aaai.org/conference/fall-symposia/fss25/"
  submission: "https://easychair.org/my/conference?conf=fss25"
  venue: "https://aaai.org/conference/fall-symposia/fss25/"
importantDates:
  round1:
    submission: "2025-08-07"
    cameraReady: "2025-08-29"
  round2:
    abstract: "2025-08-07"
    submission: "2025-08-22"
    cameraReady: "2025-09-05"
status: "current"
featured: true
---

Behind any robot task or interaction is a representation that should (a) enable sufficient contextualization; (b) support any existing predefined, learned, and/or reusable skills onboard the robot; (c) be verifiable at design time and behave consistently at run-time; and (d) can be tested, executed, and modified for reuse on a variety of different robot morphologies.

Many robotic subfields have traditionally employed a variety of different representational techniques, often borrowing from artificial intelligence (AI), to achieve their respective objectives. Examples include variants of LTL, logic, automated planning languages, languages for Belief-Desire-Intention, custom variations of these, and many more than we can list.

This year, based on community feedback, we are planning on elevating the interaction between junior and senior members of the community.
```

### Speaker Definition Example

```markdown
---
# src/content/speakers/fss-2025/cindy-bethel.md
conference: "fss_2025"
name: "Cindy Bethel"
title: "Program Director"
affiliation: "National Science Foundation & Mississippi State University"
photo: "/images/speakers/cindy-bethel.jpg"
keynote: true
order: 1
---

Dr. Cindy Bethel is a Program Director at the National Science Foundation and Professor at Mississippi State University. Her research focuses on human-robot interaction, assistive robotics, and robot learning systems.
```

### Dynamic Routing Implementation

```astro
---
// src/pages/[conference]/index.astro
import { getCollection } from 'astro:content';
import ConferenceLayout from '@/layouts/ConferenceLayout.astro';

export async function getStaticPaths() {
  const conferences = await getCollection('conferences');
  return conferences.map((conference) => ({
    params: { conference: conference.data.slug },
    props: { conference },
  }));
}

const { conference } = Astro.props;
const { Content } = await conference.render();

// Get conference-specific data
const speakers = await getCollection('speakers', ({ data }) => 
  data.conference === conference.data.slug
);
const organizers = await getCollection('organizers', ({ data }) => 
  data.conference.includes(conference.data.slug)
);
---

<ConferenceLayout conference={conference.data}>
  <Content />
  <!-- Conference-specific content -->
</ConferenceLayout>
```

### Conference-Specific Theming

```css
/* src/styles/conferences/fss.css */
:root[data-conference="fss"] {
  --accent-one: #2563eb;
  --accent-two: #1d4ed8;
  --special: #f59e0b;
}

/* src/styles/conferences/icra.css */
:root[data-conference="icra"] {
  --accent-one: #dc2626;
  --accent-two: #b91c1c;
  --special: #059669;
}
```

### Main Hub Implementation

```astro
---
// src/pages/index.astro
import { getCollection } from 'astro:content';
import HubLayout from '@/layouts/HubLayout.astro';

const conferences = await getCollection('conferences');
const upcomingConferences = conferences.filter(conf => conf.data.status === 'upcoming');
const currentConferences = conferences.filter(conf => conf.data.status === 'current');
const pastConferences = conferences.filter(conf => conf.data.status === 'past');
---

<HubLayout>
  <section class="hero">
    <h1>UR-RAD Symposium Series</h1>
    <p>Unifying Representations for Robot Application Development</p>
  </section>

  <section class="conferences">
    <h2>Current & Upcoming Conferences</h2>
    {[...currentConferences, ...upcomingConferences].map(conference => (
      <ConferenceCard conference={conference} />
    ))}
  </section>

  <section class="past-conferences">
    <h2>Past Conferences</h2>
    {pastConferences.map(conference => (
      <ConferenceCard conference={conference} />
    ))}
  </section>
</HubLayout>
```

### Migration Steps

1. **Set up content collections**:
   - Create `src/content/conferences/`, `src/content/speakers/`, `src/content/organizers/`
   - Define schemas in `src/content/config.ts`
   - Migrate current UR-RAD 2025 data to content collections

2. **Create dynamic routes**:
   - Implement `src/pages/[conference]/` directory structure
   - Create dynamic route handlers for each page type
   - Add conference-specific layouts

3. **Implement theming system**:
   - Create conference-specific CSS files
   - Implement dynamic theme switching based on conference
   - Update components to use theme variables

4. **Build hub page**:
   - Create main landing page that lists all conferences
   - Implement conference cards and navigation
   - Add search/filter functionality for conferences

5. **Test and optimize**:
   - Ensure proper SEO for each conference
   - Test dynamic routing and theme switching
   - Optimize build performance

### Benefits

- **Native Astro approach** using built-in content collections
- **Excellent code reuse** with shared components and layouts
- **Easy content management** through markdown files
- **SEO-friendly** with proper static generation
- **Flexible theming** per conference
- **Scalable** - adding new conferences is straightforward
- **Type-safe** with Zod schema validation

### Considerations

- **Learning curve** for content collections if team is unfamiliar
- **Build time** may increase with many conferences
- **Asset management** needs organization for conference-specific images

## Option 2: Workspace/Monorepo Approach

Create a monorepo with shared packages and individual conference sites.

### Structure
```
ur-rad.github.io/
├── packages/
│   ├── shared-components/     # Reusable UI components
│   ├── shared-layouts/        # Common layouts
│   ├── shared-styles/         # Base styling system
│   └── conference-types/      # TypeScript definitions
├── sites/
│   ├── main/                  # Main hub site (ur-rad.github.io)
│   ├── fss-2025/             # FSS 2025 site (ur-rad.github.io/fss_2025)
│   └── icra-2026/            # Future conference site
├── tools/
│   └── build-scripts/        # Deployment automation
└── package.json              # Workspace configuration
```

### Workspace Configuration
```json
{
  "name": "ur-rad-conferences",
  "workspaces": [
    "packages/*",
    "sites/*"
  ],
  "scripts": {
    "build:all": "npm run build --workspaces",
    "build:main": "npm run build --workspace=sites/main",
    "build:fss2025": "npm run build --workspace=sites/fss-2025"
  }
}
```

### Benefits
- **Maximum flexibility** per conference
- **Clean separation** of concerns
- **Independent deployments** possible
- **Shared component library** ensures consistency

### Considerations
- **More complex** build and deployment process
- **Potential code duplication** if not managed well
- **Learning curve** for monorepo tooling

## Option 3: Configuration-Driven Single Site

Use environment variables and configuration files to build different versions of the site.

### Conference Configuration
```typescript
// src/config/conferences/fss-2025.ts
export const fss2025Config = {
  slug: 'fss_2025',
  title: 'UR-RAD 2025',
  theme: {
    primaryColor: '#2563eb',
    accentColor: '#1d4ed8',
  },
  navigation: [
    { path: '/', title: 'Home' },
    { path: '/call-for-papers/', title: 'Call for Papers' },
    { path: '/speakers/', title: 'Speakers' },
    { path: '/program/', title: 'Program' },
  ],
  dates: {
    conference: 'November 6-8, 2025',
    submission: 'August 7, 2025',
  },
  venue: {
    name: 'Westin Arlington Gateway',
    location: 'Arlington, VA, USA',
  },
};
```

### Build Script
```javascript
// scripts/build-conference.js
import { spawn } from 'child_process';
import fs from 'fs';

const conferences = ['fss_2025', 'icra_2026'];

for (const conf of conferences) {
  process.env.CONFERENCE = conf;
  
  // Build site with conference-specific config
  const build = spawn('npm', ['run', 'build'], {
    env: { ...process.env, CONFERENCE: conf },
    stdio: 'inherit'
  });
  
  // Move build output to conference-specific directory
  fs.renameSync('dist', `dist/${conf}`);
}
```

### Benefits
- **Minimal architecture changes** needed
- **Single build process** with variations
- **Easy to understand** and implement

### Considerations
- **Build complexity** increases with more conferences
- **Limited flexibility** for conference-specific features
- **Manual build process** for each conference

## Option 4: Hybrid Static + Dynamic Approach

Build a main hub site statically, with conference-specific data loaded dynamically.

### Main Hub Structure
```astro
---
// src/pages/index.astro
import { getCollection } from 'astro:content';
import Layout from '@/layouts/Layout.astro';

const conferences = await getCollection('conferences');
const upcomingConferences = conferences
  .filter(conf => new Date(conf.data.dates.end) > new Date())
  .sort((a, b) => new Date(a.data.dates.start) - new Date(b.data.dates.start));
---

<Layout title="UR-RAD Symposium Series">
  <section>
    <h1>UR-RAD Symposium Series</h1>
    <p>Unifying Representations for Robot Application Development</p>
    
    {upcomingConferences.map(conference => (
      <ConferenceCard conference={conference} />
    ))}
  </section>
</Layout>
```

### Benefits
- **Fast main site** with static generation
- **Dynamic content loading** for conference pages
- **Good performance** balance

### Considerations
- **More complex** data management
- **Potential SEO issues** with dynamic content
- **Runtime dependencies** for data loading

## Recommendation Summary

**Option 1 (Multi-Conference Content Collections)** is recommended because it:

1. **Leverages Astro's strengths** with native content collections
2. **Minimizes migration effort** from current setup
3. **Provides excellent balance** of reusability and customization
4. **Scales well** for future conferences
5. **Maintains SEO benefits** with static generation
6. **Offers type safety** with schema validation

The content collections approach aligns well with Astro's philosophy and provides a clean, maintainable solution that can grow with the UR-RAD symposium series.

## Implementation Timeline

### Phase 1: Foundation (1-2 weeks)
- Set up content collections schema
- Create basic conference definition for UR-RAD 2025
- Implement dynamic routing structure

### Phase 2: Migration (2-3 weeks)
- Migrate current content to content collections
- Create conference-specific layouts and components
- Implement theming system

### Phase 3: Hub & Polish (1-2 weeks)
- Build main hub page
- Add conference navigation and search
- Optimize SEO and performance

### Phase 4: Testing & Launch (1 week)
- Comprehensive testing across conferences
- Documentation updates
- Deployment and monitoring

This phased approach allows for incremental development while maintaining the current site's functionality throughout the migration process.