/**
 * Append an autoplay parameter to an embed URL.
 * Preserves any existing query string.
 */
export function getEmbedUrl(url: string): string {
  if (!url) return url;
  try {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}autoplay=1`;
  } catch {
    return url;
  }
}
