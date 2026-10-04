/**
 * Google Drive Video Embed Helper
 *
 * Rules from TRD.md and SECURITY.md:
 * - Videos are Google Drive embeds: https://drive.google.com/file/d/<FILE_ID>/preview in an iframe
 * - File ID only, never full links
 * - No slashes or spaces
 */

/**
 * Extracts a clean Google Drive file ID from either an ID string or a full Drive URL.
 * @param {string} input - File ID or full Google Drive share URL
 * @returns {string} Extracted file ID or empty string
 */
export function extractDriveId(input) {
  if (!input || typeof input !== 'string') return '';
  const trimmed = input.trim();

  // If a full Drive URL was passed (e.g. https://drive.google.com/file/d/ID/view or ?id=ID)
  const urlMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1];
  }

  // Otherwise clean string to keep valid ID characters
  return trimmed.replace(/[^a-zA-Z0-9_-]/g, '');
}

/**
 * Returns the embed preview URL for a given Google Drive file ID or URL.
 * @param {string} driveId - The Google Drive file ID or share link
 * @returns {string} The embed preview URL
 */
export function getDriveEmbedUrl(driveId) {
  const cleanId = extractDriveId(driveId);
  if (!cleanId) return '';
  return `https://drive.google.com/file/d/${cleanId}/preview`;
}

/**
 * Validates whether a string is or contains a well-formed Google Drive file ID.
 * @param {string} driveId
 * @returns {boolean}
 */
export function isValidDriveId(driveId) {
  const cleanId = extractDriveId(driveId);
  return /^[a-zA-Z0-9_-]{15,50}$/.test(cleanId);
}

/**
 * Returns Google Drive's CDN thumbnail URL for a given file ID or URL.
 * @param {string} driveId - The Google Drive file ID or share link
 * @param {number} width - Requested image width in pixels (default: 600)
 * @returns {string} The direct Google CDN image URL
 */
export function getDriveThumbnailUrl(driveId, width = 600) {
  const cleanId = extractDriveId(driveId);
  if (!cleanId) return '';
  return `https://lh3.googleusercontent.com/d/${cleanId}=w${width}`;
}
