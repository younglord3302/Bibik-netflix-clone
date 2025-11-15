import { NextRequest, NextResponse } from 'next/server'
import { getTopRated } from '@/lib/tmdb'

// Mock data for when TMDB is not available
const mockTopRated = [
  {
    id: 4,
    title: "Inception",
    overview: "A thief who steals corporate secrets through dream-sharing...",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    media_type: "movie"
  },
  {
    id: 5,
    title: "Interstellar",
    overview: "A team of explorers travel through a wormhole in space...",
    poster_path: "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    backdrop_path: "/rbf5jT4wW4ZQj7rLHVRrZ1gMu6u.jpg",
    media_type: "movie"
  },
  {
    id: 6,
    title: "Avatar",
    overview: "A paraplegic Marine dispatched to the moon Pandora...",
    poster_path: "/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg",
    backdrop_path: "/8Q6CWvETuWLqWEvnG0yBGjOJAj.jpg",
    media_type: "movie"
  },
  {
    id: 7,
    name: "Breaking Bad",
    overview: "A high school chemistry teacher diagnosed with cancer...",
    poster_path: "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    backdrop_path: "/nnMC0BM6XbjIIrT4miYmMtPGcQV.jpg",
    media_type: "tv"
  },
  {
    id: 8,
    name: "The Mandalorian",
    overview: "The travels of a lone bounty hunter...",
    poster_path: "/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
    backdrop_path: "/9igosjzg4Gwr52LbGyAeVX2QOcw.jpg",
    media_type: "tv"
  }
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type') || 'movie' // default to movie
    const media = type === 'tv' ? 'tv' : 'movie'
    const page = parseInt(searchParams.get('page') || '1')

    try {
      // Try to fetch from TMDB
      const data = await getTopRated(media, page)
      return NextResponse.json({ ...data, success: true })
    } catch (error) {
      // If TMDB fails, return mock data
      console.log('Using mock data due to TMDB API error:', error)
      const filteredMock = type === 'tv'
        ? mockTopRated.filter(item => item.media_type === 'tv')
        : mockTopRated.filter(item => item.media_type === 'movie')

      return NextResponse.json({
        results: filteredMock,
        total_pages: 1,
        page: 1,
        success: true,
        mock: true
      })
    }
  } catch (error) {
    console.error('Top Rated API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch top rated content', success: false },
      { status: 500 }
    )
  }
}
