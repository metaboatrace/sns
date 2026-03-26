/**
 * Format a date value as a Japanese locale datetime string (e.g. "2026/3/27 14:05:30").
 */
export function formatDateTime(value: Date | string): string {
  return new Date(value).toLocaleString('ja-JP');
}

/**
 * Format a date value as a Japanese locale date string (e.g. "2026/3/27").
 */
export function formatDate(value: Date | string): string {
  return new Date(value).toLocaleDateString('ja-JP');
}
