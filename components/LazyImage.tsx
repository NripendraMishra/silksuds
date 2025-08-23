'use client'

import { useState } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
}

export const LazyImage = ({ src, alt, className = '' }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      {error ? (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center rounded">
          <span className="text-gray-400">Failed to load image</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  )
}
