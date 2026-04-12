import { supabase } from './supabase';

/**
 * Initialize Supabase Storage bucket for productions
 * Call this once to set up the bucket and RLS policies
 */
export async function setupProductionsStorageBucket() {
  if (!supabase) {
    console.error('[v0] Supabase not configured');
    return false;
  }

  try {
    // Create bucket if it doesn't exist
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(b => b.name === 'productions');

    if (!bucketExists) {
      const { data: newBucket, error: createError } = await supabase.storage.createBucket('productions', {
        public: true,
        fileSizeLimit: 52428800, // 50MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'],
      });

      if (createError) {
        console.error('[v0] Error creating bucket:', createError);
        return false;
      }
      console.log('[v0] Created productions bucket:', newBucket);
    } else {
      console.log('[v0] Productions bucket already exists');
    }

    return true;
  } catch (err) {
    console.error('[v0] Setup error:', err);
    return false;
  }
}

/**
 * Upload file to productions bucket
 */
export async function uploadProductionFile(
  file: File,
  folder: string = 'images'
): Promise<string | null> {
  if (!supabase) {
    console.error('[v0] Supabase not configured');
    return null;
  }

  try {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `${folder}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('productions')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('[v0] Upload error:', error);
      return null;
    }

    // Get public URL
    const { data: publicUrl } = supabase.storage
      .from('productions')
      .getPublicUrl(data.path);

    console.log('[v0] File uploaded:', publicUrl.publicUrl);
    return publicUrl.publicUrl;
  } catch (err) {
    console.error('[v0] Upload exception:', err);
    return null;
  }
}

/**
 * Delete file from productions bucket
 */
export async function deleteProductionFile(filePath: string): Promise<boolean> {
  if (!supabase) {
    console.error('[v0] Supabase not configured');
    return false;
  }

  try {
    const { error } = await supabase.storage
      .from('productions')
      .remove([filePath]);

    if (error) {
      console.error('[v0] Delete error:', error);
      return false;
    }

    console.log('[v0] File deleted:', filePath);
    return true;
  } catch (err) {
    console.error('[v0] Delete exception:', err);
    return false;
  }
}

/**
 * Extract file path from public URL
 */
export function extractFilePathFromUrl(publicUrl: string): string | null {
  try {
    const url = new URL(publicUrl);
    const pathParts = url.pathname.split('/storage/v1/object/public/productions/');
    return pathParts[1] || null;
  } catch {
    return null;
  }
}

/**
 * Detect if URL is a Supabase Storage URL
 */
export function isSupabaseStorageUrl(url: string): boolean {
  return url.includes('/storage/v1/object/public/productions/');
}
