'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

interface Movie {
  id: number
  title?: string
  name?: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  media_type?: string
}

interface ContentRowProps {
  title: string
  endpoint: string
}

export default function ContentRow({ title, endpoint }: ContentRowProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(endpoint)
        const data = await response.json()
        setMovies(data.results || [])
      } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [endpoint])

  const scroll = (direction: 'left' | 'right') => {
    const container = document.querySelector(`[data-scroll="${title}"]`) as HTMLElement
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  if (loading) {
    return (
      <div className="px-4 md:px-16 py-4">
        <h2 className="text-white text-xl font-semibold mb-4">{title}</h2>
        <div className="flex space-x-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-48 h-72 bg-gray-700 animate-pulse rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative px-4 md:px-16 py-4">
      <h2 className="text-white text-xl font-semibold mb-4">{title}</h2>
      <div className="relative group">
        {/* Left arrow */}
        <button
          className="absolute left-0 top-0 bottom-0 z-10 bg-black/70 hover:bg-black/80 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => scroll('left')}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>

        {/* Movies container */}
        <div
          data-scroll={title}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0 w-48 h-72 relative cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name || ''}
                fill
                className="object-cover rounded"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/50 transition-colors duration-200 flex items-end p-2 opacity-0 hover:opacity-100">
                <div className="text-white">
                  <h3 className="text-sm font-semibold truncate">
                    {movie.title || movie.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          className="absolute right-0 top-0 bottom-0 z-10 bg-black/70 hover:bg-black/80 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => scroll('right')}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
