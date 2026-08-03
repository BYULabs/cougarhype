/**
 * Converts a team name to a URL-friendly slug.
 * Example: "Utah Tech" -> "utah-tech"
 */
export const toSlug = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')      // Replace spaces with -
    .replace(/[^\w\-]+/g, '')  // Remove non-word characters
    .replace(/\-\-+/g, '-');   // Replace multiple - with single -
};

/**
 * Converts a slug back to a human-readable team name for API queries.
 * Example: "utah-tech" -> "Utah Tech"
 */
export const fromSlug = (slug) => {
  if (!slug) return '';
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};