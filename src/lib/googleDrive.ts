/**
 * Converts Google Drive sharing links to direct image/video URLs
 * Supports:
 * - Standard sharing links: https://drive.google.com/file/d/FILE_ID/view
 * - Short links: https://drive.google.com/file/d/FILE_ID
 * - Old format: https://drive.google.com/open?id=FILE_ID
 */
export function convertGoogleDriveUrl(url: string): string {
  if (!url || !url.includes('drive.google.com')) {
    return url;
  }

  let fileId: string | null = null;

  // Try standard format: /file/d/FILE_ID/view or /file/d/FILE_ID
  const standardMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
  if (standardMatch) {
    fileId = standardMatch[1];
  }

  // Try old format: ?id=FILE_ID
  if (!fileId) {
    const oldMatch = url.match(/[?&]id=([a-zA-Z0-9-_]+)/);
    if (oldMatch) {
      fileId = oldMatch[1];
    }
  }

  if (!fileId) {
    console.warn('[v0] Could not extract Google Drive file ID from:', url);
    return url;
  }

  // Return direct URL that works in img/video tags
  // export=view for images, export=download for videos (both work for either)
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

/**
 * Detects if URL is a Google Drive link
 */
export function isGoogleDriveUrl(url: string): boolean {
  return !!url && url.includes('drive.google.com');
}
