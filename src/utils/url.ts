/**
 * Utility functions for handling URLs with base path support
 */

/**
 * Creates a base-aware URL for internal links
 * @param path - The relative path (e.g., "about/", "/contact/", "")
 * @returns The full path with base URL applied
 */
export function url(path: string = ""): string {
  const baseUrl = import.meta.env.BASE_URL;

  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // Ensure base URL ends with slash and combine with clean path
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  return `${normalizedBase}${cleanPath}`;
}

/**
 * Creates a base-aware URL for the home page
 * @returns The home page URL with base path
 */
export function homeUrl(): string {
  return import.meta.env.BASE_URL;
}

/**
 * Checks if a URL is external (starts with http/https)
 * @param href - The URL to check
 * @returns True if the URL is external
 */
export function isExternalUrl(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//");
}
