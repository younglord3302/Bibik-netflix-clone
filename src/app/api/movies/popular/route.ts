import { NextRequest, NextResponse } from 'next/server'
import { getPopular } from '@/lib/tmdb'

// Mock data for when TMDB is not available - Using real TMDB image URLs
const mockPopularMovies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", // Real Shawshank poster
    backdrop_path: "/velWPhVMQeQKcxggNEU8YmIo52R.jpg", // Real Shawshank backdrop
    media_type: "movie"
  },
  {
    id: 2,
    title: "The Godfather",
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", // Real Godfather poster
    backdrop_path: "/Ab6Yj7WC3fp5XYqp0VB4SS8NXR.jpg", // Real Godfather backdrop
    media_type: "movie"
  },
  {
    id: 3,
    title: "The Dark Knight",
    overview: "Batman raises the stakes in his war on crime. When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", // Real Dark Knight poster
    backdrop_path: "/hqkIcbrOHL86UncnHIsHVcVmzue.jpg", // Real Dark Knight backdrop
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
