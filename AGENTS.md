# Notes for coding agents

Conventions and traps in this repository that are not obvious from reading the
code. For what the site is and how the content model works, read `README.md`
first — this file only covers the things that tend to cause mistakes.

## Use the pinned Node version

`.nvmrc` pins an exact version, and `engines` requires `>=22.12.0` (Astro 7's
floor). Select it before installing or building:

```bash
nvm use          # reads .nvmrc
npm install
```

`.npmrc` sets `engine-strict=true`, so npm refuses to install on an
unsupported runtime rather than warning and failing later in a confusing place.
CI reads the same `.nvmrc` via `node-version-file`, so local and CI cannot
drift. Bumping Node means editing `.nvmrc` only.

## Prettier formats, Biome lints

- **Prettier** is the only formatter (`npm run format`). It covers `.astro`
  via `prettier-plugin-astro`, registered in `.prettierrc.json`.
- **Biome** lints and organises imports (`npm run lint`). Its formatter is
  **disabled** in `biome.json`.

Both configs are aligned at **100 columns, spaces, indent width 2**. Biome's
formatter values are kept in sync even though disabled, so re-enabling it
cannot silently reintroduce a split. Do not run `biome format`.

`npm run lint` currently reports pre-existing errors (non-null assertions,
type-only imports). That is the baseline; do not treat it as something your
change broke, and do not mass-fix it as a side effect of unrelated work.

## Whitespace in templates

`compressHTML` is left at Astro 7's default of `'jsx'`, so whitespace between
adjacent inline elements or expressions is **stripped**. A newline between two
expressions disappears:

```astro
{author}
{year}.        <!-- renders as "UR-RAD2026." -->
```

Use an explicit `{" "}` where a space is needed. A literal space will not
survive, because Prettier re-splits the line:

```astro
{author}{" "}
{year}.        <!-- renders as "UR-RAD 2026." -->
```

## Deployment serves a branch, not an artifact

GitHub Pages is configured as **"Deploy from a branch" → `gh-pages`**. A
workflow that publishes with `upload-pages-artifact` / `deploy-pages` will
**report success and never be served** — this has bitten before and is
invisible in the Actions tab.

Anything that deploys this site must commit the build to `gh-pages`.
`.github/workflows/deploy.yml` does that, excluding `pr-preview/` from the
clean step so deploying `main` does not wipe open PRs' previews. Both
workflows that write to `gh-pages` share one `gh-pages` concurrency group,
because the deploy action force-pushes and merging a PR triggers both at once.

## Verifying a change

`astro check` and a green build are necessary but not sufficient. For anything
touching templates, components or content, compare the **rendered output**
before and after:

- Raw HTML bytes are a poor test — template indentation carries through, so
  reformatting alone changes every file. Compare with whitespace runs collapsed
  instead, and separately compare visible text with tags stripped.
- Collapsed-whitespace comparison still catches whitespace added or removed
  *between* inline elements, which is a real visible change.
- Clear `.astro` (the content store) between builds when testing determinism;
  a warm cache can hide ordering differences.

## Keep output deterministic

Rendered output should be a pure function of the source. Astro's collection
order is **not** stable across content-store rebuilds, so anything derived from
it must impose its own order:

- Tag listings sort by count, then by a locale-independent comparator. Do not
  use `localeCompare` here — it depends on the runtime's default locale and ICU
  data, so it can differ between a laptop and CI.
- Do not select "the first N" of anything that comes from a collection. Sort
  first, then slice.

## Editions

Each year is a content-driven edition; there are no per-year page files. The
edition whose `status` is `current` is served at the site root, and every other
edition at `/<code>/`. Promoting a new year is a two-field change across two
edition files — see `README.md` for the full layout and how to add one.

Sections hide themselves when their data is empty, so an edition with no
partners has no Partners page or nav link. Prefer adding data over adding
conditionals.

## Attribution

Do not infer a GitHub username from an OS username, `git config` value, or
email address — short usernames frequently belong to an unrelated account, and
an `@mention` notifies a real person. Resolve handles with
`gh api user --jq .login` or `gh pr view <n> --json author -q .author.login`,
and prefer plain-text names over `@mentions` in PR descriptions, commit
messages and comments.
