import type { SiteConfig } from "@/types";
import type { Edition, PageKey } from "@/data/editions";

export const siteConfig: SiteConfig = {
  // Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
  author: "UR-RAD",
  // Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
  date: {
    locale: "en-GB",
    options: {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  },
  // Series-level fallback description: the webmanifest and RSS feed are built
  // from astro.config.ts, which runs before content collections are available
  // and so cannot be edition-aware. Keep this free of the year and ordinal —
  // pages with an edition get its `tagline` instead (see layouts/Base.astro).
  description:
    "The AAAI Fall Symposium on Unifying Representations for Robot Application Development",
  // HTML lang property, found in src/layouts/Base.astro L:18 & astro.config.ts L:48
  lang: "en-GB",
  // Meta property, found in src/components/BaseHead.astro L:42
  ogLocale: "en_GB",
  // Series name, used for the webmanifest name (astro.config.ts) and the RSS
  // feed title. Per-page titles use the viewed edition's own title instead
  // (see the `siteName` prop in src/layouts/Base.astro), so this stays
  // year-agnostic rather than needing a bump every autumn.
  title: "UR-RAD",
};

// Used to generate links in both the Header & Footer.
// `key` drives edition-aware links in the Header (current year at root, past
// years under their code prefix); `path` is the current-edition root path used
// by the global Footer. `available` optionally hides the link for editions
// that don't have the corresponding content (e.g. a year with no partners).
export const menuLinks: {
  key: PageKey;
  path: string;
  title: string;
  available?: (edition: Edition) => boolean;
}[] = [
  {
    key: "home",
    path: "/",
    title: "Home",
  },
  {
    key: "call-for-papers",
    path: "/call-for-papers/",
    title: "Call for Papers",
  },
  {
    key: "people",
    path: "/people/",
    title: "People",
  },
  {
    key: "partners",
    path: "/partners/",
    title: "Partners",
    available: (edition) => (edition.data.partners?.length ?? 0) > 0,
  },
  {
    key: "program",
    path: "/program/",
    title: "Program",
  },
];

// Past UR-RAD symposia hosted on external sites (pre-migration years). Shown in
// the year switcher under a subtle "External" label; open in a new tab.
// `speakers` records that year's invited speakers as display strings — these
// years predate the `people` collection, so there are no records to derive
// from. Every later edition's "Previous UR-RAD Speakers" list picks them up
// automatically (see getPreviousSpeakerGroups), so they're written once here.
export const externalSymposia: {
  year: number;
  label: string;
  url: string;
  speakers?: string[];
}[] = [
  {
    year: 2024,
    label: "UR-RAD 2024",
    url: "https://sites.google.com/view/aaai-ur-rad-24-symposium",
    speakers: [
      "Cynthia Matuszek, University of Maryland, Baltimore County",
      "Siddharth Srivastava, Arizona State University",
      "Jamie Macbeth, Smith College",
      "Brittany Johnson-Matthews, George Mason University",
    ],
  },
  {
    year: 2023,
    label: "UR-RAD 2023",
    url: "https://sites.google.com/view/aaai-ur-rad-23-symposium",
    speakers: ["Dana Nau", "Matthias Scheutz", "Stefanie Tellex", "Chien-Ming Huang"],
  },
];
