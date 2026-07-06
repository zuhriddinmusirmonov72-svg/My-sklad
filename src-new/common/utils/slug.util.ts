/**
 * Generate URL-friendly slug from text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generate unique slug with timestamp
 */
export function generateUniqueSlug(text: string): string {
  const baseSlug = generateSlug(text);
  const timestamp = Date.now();
  return `${baseSlug}-${timestamp}`;
}

/**
 * Generate slug with random suffix
 */
export function generateSlugWithSuffix(text: string, suffix?: string): string {
  const baseSlug = generateSlug(text);
  if (suffix) {
    return `${baseSlug}-${suffix}`;
  }
  return baseSlug;
}
