import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

/**
 * Builds a Vercel Image Optimization URL.
 * Falls back gracefully to the original src in non-Vercel environments.
 */
function vercelImageUrl(src: string, width: number, quality = 80): string {
  // Only apply Vercel image optimization to local paths
  if (!src.startsWith('/') && !src.startsWith('http')) return src;
  const encoded = encodeURIComponent(src);
  return `/_vercel/image?url=${encoded}&w=${width}&q=${quality}`;
}

const OptimizedImage = ({
  src,
  alt,
  className,
  loading = 'lazy',
  width = 800,
  onError,
}: OptimizedImageProps) => {
  // Skip optimization for video files
  if (src.endsWith('.mp4') || src.endsWith('.webm')) {
    return null;
  }

  const w1x = vercelImageUrl(src, width, 80);
  const w2x = vercelImageUrl(src, width * 2, 80);

  return (
    <img
      src={w1x}
      srcSet={`${w1x} 1x, ${w2x} 2x`}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      width={width}
      onError={onError}
    />
  );
};

export default OptimizedImage;
