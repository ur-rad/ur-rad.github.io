# UR-RAD Symposium Website

This repository contains the website for the UR-RAD (Unifying Representations for Robot Application Development) symposium series, built with [Astro](https://astro.build/) and deployed on GitHub Pages.

## About UR-RAD

UR-RAD is an annual symposium held as part of the AAAI Fall Symposium Series, focused on unifying representations for robot application development. The symposium brings together researchers from robotics, AI, and related fields to discuss representational techniques and their applications in robotics.

## Current Site

The live site hosts **UR-RAD 2026**, the 4th iteration of the symposium:
- **Date**: November 5-7, 2026
- **Location**: Westin Arlington Gateway, Arlington, VA, USA
- **Website**: [ur-rad.github.io](https://ur-rad.github.io)

Past editions stay online under their conference code — 2025 is at
[/fss_2025/](https://ur-rad.github.io/fss_2025/). Pre-migration years (2024,
2023) are external sites, linked from the year switcher in the header.

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm, pnpm, or yarn

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/ur-rad/ur-rad.github.io.git
cd ur-rad.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`

## Commands

| Command          | Action                                                         |
| :--------------- | :------------------------------------------------------------- |
| `npm install`    | Installs dependencies                                          |
| `npm run dev`    | Starts local dev server at `localhost:4321`                   |
| `npm run build`  | Build your production site to `./dist/`                       |
| `npm run preview`| Preview your build locally, before deploying                  |
| `npm run sync`   | Generate types based on your config in `src/content/config.ts`|

## Site Configuration

- **Main config**: `src/site.config.ts` - Site metadata, navigation, and basic settings
- **Astro config**: `astro.config.ts` - Build settings, integrations, and deployment config
- **Styling**: `src/styles/global.css` - Global styles and CSS variables
- **Content**: Page content is in `src/pages/` with components in `src/components/`

## Key Features

- 🚀 **Astro v5** - Fast, modern static site generation
- 🎨 **Tailwind CSS** - Utility-first styling with custom design system
- 📱 **Responsive Design** - Mobile-first approach with accessibility in mind
- 🌓 **Dark/Light Mode** - Automatic theme switching
- 📄 **SEO Optimized** - Meta tags, sitemap, and social sharing
- 📊 **Performance Focused** - Optimized builds and fast loading

## Architecture

Each year is a content-driven **edition**. There are no per-year page files —
five generic page engines render any edition from its content entry:

| Layer | Location |
| :---- | :------- |
| Edition data (source of truth) | `src/content/editions/<code>.md` — dates, venue, URLs, topics, submission types, CFP timeline, people roles, partners |
| Page engines | `src/components/pages/` — `HomePage`, `CallForPapersPage`, `PeoplePage`, `ProgramPage`, `PartnersPage` |
| Prose bodies | `src/content/pages/<code>/<pageKey>.mdx` |
| People | `src/content/people/` — stable identity records, referenced by editions with `roles: [keynote/mentor/organizer]` |
| Schedule | `src/content/program/<code>.yaml` |
| Papers | `src/content/papers/` — each tagged with its `edition` |
| Schemas | `src/content.config.ts` — Zod, so a typo fails the build |
| Edition resolution | `src/data/editions.ts` |

Routing follows an edition's `status`: the one marked `current` is served at the
site root, and every other edition at `/<code>/`. Promoting a new year is a
two-field change across two edition files.

Sections hide themselves when their data is empty — an edition with no partners
gets no Partners page or nav link, and one with no keynotes yet shows an
"announced soon" note instead. Previous-year speaker lists are derived from past
editions rather than restated per year.

`CONFERENCE_ARCHITECTURE.md` records the original options paper behind this
design; the code is authoritative.

## Adding a New Edition

1. Add `src/content/editions/<code>.md` (copy the most recent year and edit)
2. Add prose bodies under `src/content/pages/<code>/`
3. Flip the previous edition's `status` to `past` and the new one to `current`
4. Add any new people to `src/content/people/`, with photos in `src/assets/images/`

## Deployment

The site is automatically deployed when changes are pushed to `main`
(`.github/workflows/deploy.yml`):

1. GitHub Actions builds the site with `npm run build` and indexes it with `npm run postbuild`
2. `./dist/` is committed to the `gh-pages` branch, excluding `pr-preview/`
3. GitHub Pages serves that branch (Settings → Pages → "Deploy from a branch")

Pull requests get a preview at `/pr-preview/pr-<n>/` via
`.github/workflows/preview.yml`. Both workflows write to `gh-pages`, so they
share one `gh-pages` concurrency group to keep their pushes from racing.

**Note:** because Pages serves a branch rather than an Actions artifact, a
`deploy-pages` style workflow would report success while never being served.
Anything that deploys this site has to commit to `gh-pages`.

## Content Management

### Updating an Edition
- **Dates, venue, topics, submission types, CFP timeline**: that edition's file in `src/content/editions/`
- **Page prose**: the matching MDX under `src/content/pages/<code>/`
- **Speakers, mentors, organizers**: add or edit `src/content/people/<slug>.md`, then reference the slug in the edition's `people:` list with the right `roles`. Photos go in `src/assets/images/speakers/` or `.../organizers/`.
- **Schedule**: `src/content/program/<code>.yaml`

### Updating Site-Wide Settings
- **Navigation**: `menuLinks` in `src/site.config.ts`
- **Past external symposia** (pre-migration years, shown in the year switcher): `externalSymposia` in `src/site.config.ts`
- **Series name and fallback description**: `src/site.config.ts` — keep these year-agnostic; per-page titles and descriptions come from the edition being viewed

### Styling
- **Global styles**: `src/styles/global.css`
- **Component styles**: Use Tailwind classes in `.astro` files
- **Theme colors**: Defined in CSS variables in global styles

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## Previous Conferences

- **UR-RAD 2024**: [View archived site](https://sites.google.com/view/aaai-ur-rad-24-symposium)
- **UR-RAD 2023**: [View archived site](https://sites.google.com/view/aaai-ur-rad-23-symposium)

## Contact

For questions about the website or technical issues:
- **Email**: [urrad.symposium@gmail.com](mailto:urrad.symposium@gmail.com)
- **Issues**: [GitHub Issues](https://github.com/ur-rad/ur-rad.github.io/issues)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Note**: This site began from the [Astro Citrus](https://github.com/artemkutsan/astro-citrus) template by [Artem Kutsan](https://github.com/artemkutsan). Thank you for the excellent foundation!