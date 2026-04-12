import React from 'react';
import { convertGoogleDriveUrl } from '@/lib/googleDrive';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

const OptimizedImage = ({
  src,
  alt,
  className,
  loading = 'lazy',
  onError,
}: OptimizedImageProps) => {
  if (src.endsWith('.mp4') || src.endsWith('.webm')) {
    return null;
  }

  // Convert Google Drive links to direct URLs
  const imageUrl = convertGoogleDriveUrl(src);

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={onError}
    />
  );
};

export default OptimizedImage;
