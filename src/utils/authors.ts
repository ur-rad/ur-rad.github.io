/**
 * Utilities for formatting author names and bylines consistently across the site.
 *
 * Goals:
 * - Format an individual's display name as "Last, F." (e.g., "Elbeleidy, S.")
 * - Build a byline from a list of authors with English conjunctions and "et al."
 * - Heuristics for multi-word family names (particles like "de la", "van der", etc.)
 * - Ignore common suffixes (Jr., III, PhD) and prefixes (Dr., Prof., etc.)
 * - Strict TypeScript typing and null/undefined safety
 */

/** Input type accepted by the formatter: either a raw string or an object with an optional name */
export type AuthorLike = string | { name?: string | null | undefined };

/** Options to control how author lists are formatted into a byline */
export interface BylineOptions {
  /**
   * Maximum number of authors to expand in the byline. If the number of authors
   * exceeds this, the byline will be reduced to "FirstAuthor et al."
   * Defaults to 3.
   */
  maxAuthors?: number;

  /**
   * Conjunction word between the last two authors when the list is expanded.
   * Defaults to "and".
   */
  conjunction?: "and" | "&";

  /**
   * Whether to use an Oxford comma for three authors (e.g., "A, B, and C").
   * Defaults to true.
   */
  useOxfordComma?: boolean;

  /**
   * The string used to indicate truncated author lists.
   * Defaults to "et al." (with period).
   */
  etAl?: string;

  /**
   * Custom single-name formatter function. Defaults to formatNameLastInitial.
   */
  formatName?: (name: string) => string;
}

/** Extract "name" strings from AuthorLike[] safely, removing null/undefined/empty values. */
export function getAuthorNames(
  authors: AuthorLike[] | null | undefined,
): string[] {
  if (!Array.isArray(authors)) return [];
  const names: string[] = [];
  for (const a of authors) {
    if (typeof a === "string") {
      const s = a.trim();
      if (s.length > 0) names.push(s);
    } else if (a && typeof a === "object" && typeof a.name === "string") {
      const s = a.name.trim();
      if (s.length > 0) names.push(s);
    }
  }
  return names;
}

/**
 * Format a single personal name into "Last, F." using heuristics:
 * - Strips common prefixes (Dr., Prof., Mr., Ms., Mrs.)
 * - Strips common suffixes (Jr., III, PhD, MD, etc.)
 * - Includes common surname particles with the last name (e.g., "de la", "van der", "von")
 * - First initial is the first alphabetic letter of the first token
 *
 * Examples:
 *  - "Saad Elbeleidy"           -> "Elbeleidy, S."
 *  - "Ken van der Merwe"        -> "van der Merwe, K."
 *  - "María de la Cruz"         -> "de la Cruz, M."
 *  - "John Smith Jr."           -> "Smith, J."
 *  - "Dr. Alice von Neumann PhD"-> "von Neumann, A."
 */
export function formatNameLastInitial(name: string): string {
  const raw = (name ?? "").trim();
  if (!raw) return "";

  const tokens = raw.split(/\s+/).filter((t) => t.length > 0);
  if (tokens.length === 0) return "";

  const norm = (s: string): string => s.toLowerCase().replace(/[.,]/g, "");

  // Common honorifics/prefixes to exclude from first token
  const PREFIXES = new Set<string>([
    "dr",
    "prof",
    "mr",
    "mrs",
    "ms",
    "mx",
    "sir",
    "madam",
  ]);

  // Common suffixes and generational markers to ignore at the end
  const SUFFIXES = new Set<string>([
    "jr",
    "sr",
    "ii",
    "iii",
    "iv",
    "v",
    "phd",
    "md",
    "dds",
    "dmd",
  ]);

  // Common surname particles to include as part of the last name (walked token-by-token)
  const PARTICLES = new Set<string>([
    "de",
    "del",
    "della",
    "di",
    "da",
    "dos",
    "das",
    "du",
    "des",
    "le",
    "la",
    "van",
    "von",
    "den",
    "der",
    "ten",
    "ter",
    // apostrophe forms
    "d'",
    "d’", // U+2019
    "o'",
    "o’", // U+2019
  ]);

  // Remove leading prefixes
  let start = 0;
  while (start < tokens.length - 1 && PREFIXES.has(norm(tokens[start]!))) {
    start++;
  }

  // Remove trailing suffixes
  let end = tokens.length - 1;
  while (end > start && SUFFIXES.has(norm(tokens[end]!))) {
    end--;
  }

  const parts = tokens.slice(start, end + 1); // guaranteed non-negative range
  if (parts.length === 0) return "";

  // If after cleaning we end up with a single token, use it as the last name and build an initial from it.
  if (parts.length === 1) {
    const single = parts[0]!;
    const firstInitial = extractFirstInitial(single);
    return `${single}, ${firstInitial}`;
  }

  // Determine the last name (include contiguous particles immediately before the last core token)
  const lastTokens: string[] = [];
  {
    const lastCore = parts[parts.length - 1]!;
    lastTokens.unshift(lastCore);
    let i = parts.length - 2;
    while (i >= 1) {
      const token = parts[i]!;
      if (!PARTICLES.has(norm(token))) break;
      lastTokens.unshift(token);
      i--;
    }
  }
  const lastName = lastTokens.join(" ");

  // First initial from first token (post prefix removal)
  const firstToken = parts[0]!;
  const initial = extractFirstInitial(firstToken);

  return `${lastName}, ${initial}`;
}

/** Extracts the first alphabetic character (A-Z) from a token and returns it as "X." or "?" if none. */
function extractFirstInitial(token: string): string {
  const m = token.match(/[A-Za-z]/);
  return m ? `${m[0]!.toUpperCase()}.` : "?";
}

/**
 * Format a byline string from a list of authors, with English conjunctions,
 * Oxford comma, and "et al." handling when the list exceeds a maximum length.
 *
 * This function only returns the names portion (e.g., "Elbeleidy, S., Schoen, A., and Birmingham, C.")
 * and intentionally does not prepend "by ". The caller can add that if desired.
 */
export function formatAuthorsByline(
  authors: AuthorLike[] | null | undefined,
  options?: BylineOptions,
): string {
  const {
    maxAuthors = 3,
    conjunction = "and",
    useOxfordComma = true,
    etAl = "et al.",
    formatName = formatNameLastInitial,
  } = options ?? {};

  const baseNames = getAuthorNames(authors);
  const names = baseNames.map((n) => formatName(n)).filter((s) => s.length > 0);

  if (names.length === 0) return "";
  if (names.length > maxAuthors) {
    // "FirstAuthor et al."
    const first = names[0]!;
    return `${first} ${etAl}`;
  }

  if (names.length === 1) {
    return names[0] ?? "";
  }

  if (names.length === 2) {
    return `${names[0]} ${conjunction} ${names[1]}`;
  }

  // names.length >= 3 but <= maxAuthors
  const head = names.slice(0, -1).join(", ");
  const oxford = useOxfordComma ? "," : "";
  return `${head}${oxford} ${conjunction} ${names[names.length - 1]}`;
}

/** Convenience: returns the byline prefixed with "by " when there are any authors; otherwise returns empty string. */
export function formatBylineWithPrefix(
  authors: AuthorLike[] | null | undefined,
  options?: BylineOptions,
): string {
  const core = formatAuthorsByline(authors, options);
  return core ? `by ${core}` : "";
}
