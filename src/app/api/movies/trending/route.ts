import { NextRequest, NextResponse } from 'next/server'
import { getTrending } from '@/lib/tmdb'

// Mock data for when TMDB is not available
const mockTrending = [
  {
    id: 9,
    title: "Dune: Part Two",
    overview: "Paul Atreides unites with Chani and the Fremen...",
    poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    media_type: "movie"
  },
  {
    id: 10,
    title: "The Batman",
    overview: "When a sadistic serial killer begins murdering key...",
    poster_path: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    backdrop_path: "/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    media_type: "movie"
  },
  {
    id: 11,
    name: "House of the Dragon",
    overview: "The Targaryen civil war grips Westeros...",
    poster_path: "/z2yahl2uefxDCl0nogcRBxaTzPx.jpg",
    backdrop_path: "/zAAqWRGwwIqpFq57RP8Fy2RmPBJ.jpg",
    media_type: "tv"
  }
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const media = (searchParams.get('media') as 'movie' | 'tv' | 'all') || 'all'
    const page = parseInt(searchParams.get('page') || '1')

    try {
      // Try to fetch from TMDB
      const data = await getTrending(media, page)
      return NextResponse.json({ ...data, success: true })
    } catch (error) {
      // If TMDB fails, return mock data
      console.log('Using mock data due to TMDB API error:', error)
      return NextResponse.json({
        results: mockTrending,
        total_pages: 1,
        page: 1,
        success: true,
        mock: true
      })
    }
  } catch (error) {
    console.error('Trending API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trending content', success: false },
      { status: 500 }
    )
  }
}
