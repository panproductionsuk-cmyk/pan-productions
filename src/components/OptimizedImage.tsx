import React from 'react';

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

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={onError}
    />
  );
};

export default OptimizedImage;
