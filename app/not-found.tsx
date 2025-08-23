import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl lg:text-9xl font-bold text-accent-600 mb-4">404</h1>
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">Page Not Found</h2>
      <p className="text-xl text-gray-600 mb-8 max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <Link href="/" className="btn btn-primary px-8 py-4 text-lg">
        Back to Home
      </Link>
    </div>
  )
}
