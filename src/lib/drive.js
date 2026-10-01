/**
 * Google Drive Video Embed Helper
 *
 * Rules from TRD.md and SECURITY.md:
 * - Videos are Google Drive embeds: https://drive.google.com/file/d/<FILE_ID>/preview in an iframe
 * - File ID only, never full links
 * - No slashes or spaces
 */

/**
 * Returns the embed preview URL for a given Google Drive file ID.
 * @param {string} driveId - The Google Drive file ID
 * @returns {string} The embed preview URL
 */
export function getDriveEmbedUrl(driveId) {
  if (!driveId || typeof driveId !== 'string') {
    return '';
  }
  
  // Clean file ID - remove any extraneous path or query characters
  const cleanId = driveId.trim().replace(/[^a-zA-Z0-9_-]/g, '');
  return `https://drive.google.com/file/d/${cleanId}/preview`;
}

/**
 * Validates whether a string is a well-formed Google Drive file ID.
 * @param {string} driveId
 * @returns {boolean}
 */
export function isValidDriveId(driveId) {
  if (!driveId || typeof driveId !== 'string') return false;
  const trimmed = driveId.trim();
  return /^[a-zA-Z0-9_-]{15,50}$/.test(trimmed);
}
