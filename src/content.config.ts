import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

function removeDupsAndLowerCase(array: string[]) {
  return [...new Set(array.map((str) => str.toLowerCase()))];
}

const baseSchema = z.object({
  title: z.string().max(200),
});

// Papers (formerly "post") — academic papers/presentations for a single edition.
const papers = defineCollection({
  loader: glob({ base: "./src/content/papers", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    baseSchema.extend({
      // Conference edition code this paper belongs to (e.g. "fss2025").
      // Assigned explicitly — a calendar year may host more than one event.
      edition: z.string(),
      abstract: z.string(),
      authors: z.array(
        z.object({
          name: z.string(),
          affiliationIndices: z.array(z.number()),
        }),
      ),
      affiliations: z.array(z.string()),
      pdfUrl: z.string().optional(),
      award: z.string().optional(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      publishDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      // Optional fields for backward compatibility
      description: z.string().optional(),
      coverImage: z
        .object({
          alt: z.string(),
          src: image(),
        })
        .optional(),
      ogImage: z.string().optional(),
      updatedDate: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
    }),
});

// Editions — one entry per conference year. The declarative source of truth
// for an edition's identity, dates, important dates, people roles, partners, etc.
const editions = defineCollection({
  loader: glob({ base: "./src/content/editions", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
   z.object({
    code: z.string(), // slug/id, e.g. "fss2025" (also the past-year URL prefix)
    year: z.number(),
    ordinal: z.string().optional(), // "3rd"
    status: z.enum(["current", "past", "upcoming"]),
    title: z.string(), // "UR-RAD 2025"
    tagline: z.string().optional(),
    fullName: z.string().optional(),
    dates: z.object({
      start: z.string(),
      end: z.string(),
      display: z.string(), // "November 6-8, 2025"
    }),
    venue: z
      .object({
        name: z.string(),
        city: z.string().optional(),
        country: z.string().optional(),
        url: z.string().optional(),
      })
      .optional(),
    urls: z
      .object({
        registration: z.string().optional(),
        submission: z.string().optional(),
        aaai: z.string().optional(),
        venue: z.string().optional(),
      })
      .optional(),
    importantDates: z
      .array(
        z.object({
          label: z.string(),
          date: z.string(),
          struck: z.boolean().default(false),
        }),
      )
      .default([]),
    // Research areas, shown on Home and Call for Papers.
    topics: z.array(z.string()).default([]),
    // Submission formats, shown on Home (brief) and Call for Papers (cards).
    submissionTypes: z
      .array(
        z.object({
          name: z.string(),
          pages: z.string().optional(), // "4-8 pages*"
          archival: z.string().optional(), // "archival OR non-archival"
          description: z.string().optional(),
          accent: z.enum(["accent-one", "accent-two", "muted"]).optional(),
        }),
      )
      .default([]),
    // Call-for-papers timeline. Each item is a styled milestone; `was` renders
    // a struck-through previous date next to the current `heading`.
    timeline: z
      .array(
        z.object({
          heading: z.string(),
          was: z.string().optional(),
          variant: z
            .enum(["special", "accent-one", "accent-two", "final"])
            .default("accent-one"),
          lead: z.string().optional(),
          bullets: z
            .array(
              z.object({ strong: z.string().optional(), text: z.string().optional() }),
            )
            .default([]),
          tip: z.string().optional(),
          note: z.string().optional(),
        }),
      )
      .default([]),
    previousSymposia: z
      .array(z.object({ year: z.number(), label: z.string(), url: z.string() }))
      .default([]),
    previousSpeakers: z
      .array(z.object({ heading: z.string(), names: z.array(z.string()) }))
      .default([]),
    // Per-edition role assignments referencing the `people` collection by id.
    // `roles` is a list: one person may hold several roles in a single year.
    people: z
      .array(
        z.object({
          personId: z.string(),
          roles: z.array(z.enum(["keynote", "mentor", "organizer"])),
          order: z.number().optional(),
          affiliation: z.string().optional(), // per-year override
          title: z.string().optional(), // per-year override
        }),
      )
      .default([]),
    partners: z
      .array(
        z.object({
          name: z.string(),
          logo: image().optional(),
          url: z.string().optional(),
          video: z.string().optional(),
          blurb: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

// People — stable identity records (no detail routes). Referenced by editions.
const people = defineCollection({
  loader: glob({ base: "./src/content/people", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      photo: image().optional(),
      affiliation: z.string().optional(),
      title: z.string().optional(),
      website: z.string().optional(),
      bio: z.string().optional(),
    }),
});

// Pages — per-edition "designed page" bodies (MDX block layouts). Entry id is
// "<code>/<pageKey>" (e.g. "fss2025/call-for-papers").
const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

// Program — per-edition schedule, authored as YAML. Entry id is the edition code.
const program = defineCollection({
  loader: glob({ base: "./src/content/program", pattern: "**/*.{yaml,yml,json}" }),
  schema: z.object({
    days: z.array(
      z.object({
        heading: z.string(),
        entries: z.array(
          z.object({
            time: z.string(),
            content: z.string().optional(),
            paperSession: z
              .object({
                title: z.string(),
                items: z.array(z.object({ slug: z.string() })),
              })
              .optional(),
          }),
        ),
      }),
    ),
  }),
});

export const collections = { papers, editions, people, pages, program };
