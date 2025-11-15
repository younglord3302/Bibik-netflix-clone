import { NextRequest, NextResponse } from 'next/server'
import { getTrending } from '@/lib/tmdb'

// Mock data for when TMDB is not available - Using real TMDB image URLs
const mockTrending = [
  {
    id: 9,
    title: "Dune: Part Two",
    overview: "Paul Atreides unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.",
    poster_path: "/5aUVLiqcW0UiFYJH2VHQoUPr61.jpg", // Real Dune poster
    backdrop_path: "/sR0SpCrXamlCkFzOpGYjoKtImNx.jpg", // Real Dune backdrop
    media_type: "movie"
  },
  {
    id: 10,
    title: "The Batman",
    overview: "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family.",
    poster_path: "/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg", // Real Batman poster
    backdrop_path: "/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg", // Real Batman backdrop
    media_type: "movie"
  },
  {
    id: 11,
    name: "House of the Dragon",
    overview: "The Targaryen civil war grips Westeros. Lord Otto Hightower, Hand of the King, maneuvers to usurp Aegon II as his father's chosen heir.",
    poster_path: "/zAAqWRGwwIqpFq57RP8Fy2RmPBJ.jpg", // Real HotD poster
    backdrop_path: "/zAAqWRGwwIqpFq57RP8Fy2RmPBJ.jpg", // Real HotD backdrop
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
