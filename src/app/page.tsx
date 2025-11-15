'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronRightIcon, PlayIcon, InformationCircleIcon } from '@heroicons/react/24/solid'
import ContentRow from '@/components/ContentRow'

interface Movie {
  id: number
  title?: string
  name?: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  media_type?: string
}

export default function Home() {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch('/api/movies/trending')
        const data = await response.json()
        if (data.results && data.results.length > 0) {
          setFeaturedMovie(data.results[0])
        }
      } catch (error) {
        console.error('Error fetching trending movies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingMovies()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      {featuredMovie && (
        <div className="relative h-screen">
          <Image
            src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
            alt={featuredMovie.title || featuredMovie.name || ''}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
          <div className="absolute bottom-32 left-4 md:left-16 max-w-xl">
            <h1 className="text-4xl md:text-7xl font-bold mb-4">
              {featuredMovie.title || featuredMovie.name}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200 line-clamp-3">
              {featuredMovie.overview}
            </p>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-300 transition-colors">
                <PlayIcon className="h-6 w-6" />
                <span>Play</span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-500/70 text-white px-6 py-3 rounded font-semibold hover:bg-gray-500/50 transition-colors">
                <InformationCircleIcon className="h-6 w-6" />
                <span>More Info</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Rows */}
      <div className="relative z-10 -mt-32 pb-20">
        <ContentRow title="Trending Now" endpoint="/api/movies/trending" />
        <ContentRow title="Popular Movies" endpoint="/api/movies/popular" />
        <ContentRow title="Top Rated TV Shows" endpoint="/api/movies/toprated?type=tv" />
      </div>
    </div>
  )
}
