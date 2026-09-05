/**
 * Strip HTML tags from a string and return plain text.
 * Also collapses multiple whitespace characters into a single space.
 */
export function stripHtml(html?: string | null): string {
  if (!html) return '';

  // Use a temporary DOM element to parse HTML safely in browser environments.
  if (typeof document !== 'undefined') {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return (tmp.textContent || tmp.innerText || '').replace(/\s+/g, ' ').trim();
  }

  // Fallback for SSR/Node environments: remove tags with regex.
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Truncate text to a maximum length, adding ellipsis if truncated.
 */
export function truncateText(text: string, maxLength = 160): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}
