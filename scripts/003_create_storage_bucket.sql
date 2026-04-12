-- Create a public storage bucket for production images and videos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'productions',
  'productions',
  true,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'video/mp4']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'video/mp4'];

-- Allow public read access to the productions bucket
CREATE POLICY IF NOT EXISTS "Public read access for productions"
ON storage.objects FOR SELECT
USING (bucket_id = 'productions');

-- Allow authenticated users to upload files (for admin panel)
CREATE POLICY IF NOT EXISTS "Authenticated users can upload to productions"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'productions');

-- Allow authenticated users to update their uploads
CREATE POLICY IF NOT EXISTS "Authenticated users can update productions files"
ON storage.objects FOR UPDATE
USING (bucket_id = 'productions');

-- Allow authenticated users to delete files
CREATE POLICY IF NOT EXISTS "Authenticated users can delete productions files"
ON storage.objects FOR DELETE
USING (bucket_id = 'productions');
