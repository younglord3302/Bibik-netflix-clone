import { NextRequest, NextResponse } from 'next/server'
import { getTopRated } from '@/lib/tmdb'

// Mock data for when TMDB is not available - Using real TMDB image URLs
const mockTopRated = [
  {
    id: 4,
    title: "Inception",
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life.",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", // Real Inception poster
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg", // Real Inception backdrop
    media_type: "movie"
  },
  {
    id: 5,
    title: "Interstellar",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", // Real Interstellar poster
    backdrop_path: "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg", // Real Interstellar backdrop
    media_type: "movie"
  },
  {
    id: 6,
    title: "Avatar",
    overview: "In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting.",
    poster_path: "/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg", // Real Avatar poster
    backdrop_path: "/8Q6CWvETuWLqWEvnG0yBGjOJAj.jpg", // Real Avatar backdrop
    media_type: "movie"
  },
  {
    id: 7,
    name: "Breaking Bad",
    overview: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.",
    poster_path: "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg", // Real Breaking Bad poster
    backdrop_path: "/suopoADq0k8YZr4dQXcU6pToj6s.jpg", // Real Breaking Bad backdrop
    media_type: "tv"
  },
  {
    id: 8,
    name: "The Mandalorian",
    overview: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
    poster_path: "/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg", // Real Mandalorian poster
    backdrop_path: "/9igosjzg4Gwr52LbGyAeVX2QOcw.jpg", // Real Mandalorian backdrop
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
