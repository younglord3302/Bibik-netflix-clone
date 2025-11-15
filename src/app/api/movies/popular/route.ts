import { NextRequest, NextResponse } from 'next/server'
import { getPopular } from '@/lib/tmdb'

// Mock data for when TMDB is not available
const mockPopularMovies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond over a number of years...",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdrop_path: "/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg",
    media_type: "movie"
  },
  {
    id: 2,
    title: "The Godfather",
    overview: "The aging patriarch of an organized crime dynasty...",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/tamkUyXaLd4y8B3LauEkKsKk60w.jpg",
    media_type: "movie"
  },
  {
    id: 3,
    title: "The Dark Knight",
    overview: "Batman raises the stakes in his war on crime...",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/rMm94JsRfcOPiPVsqJNSu0rN9zG.jpg",
    media_type: "movie"
  }
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const media = (searchParams.get('type') as 'movie' | 'tv') || 'movie'
    const page = parseInt(searchParams.get('page') || '1')

    try {
      // Try to fetch from TMDB
      const data = await getPopular(media, page)
      return NextResponse.json({ ...data, success: true })
    } catch (error) {
      // If TMDB fails, return mock data
      console.log('Using mock data due to TMDB API error:', error)
      return NextResponse.json({
        results: mockPopularMovies,
        total_pages: 1,
        page: 1,
        success: true,
        mock: true
      })
    }
  } catch (error) {
    console.error('Popular API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch popular content', success: false },
      { status: 500 }
    )
  }
}
