import axios from 'axios'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_API_KEY = process.env.TMDB_API_KEY!

const tmdb = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
})

export interface TMDBMovie {
  id: number
  title: string
  name?: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  first_air_date?: string
  genre_ids: number[]
  vote_average: number
  vote_count: number
  popularity: number
  adult: boolean
  original_language: string
  media_type?: 'movie' | 'tv'
}

export interface TMDBResponse {
  results: TMDBMovie[]
  total_pages: number
  page: number
}

export interface TMDBVideo {
  type: string
  site: string
  key: string
}

export async function getTrending(media: 'movie' | 'tv' | 'all', page = 1): Promise<TMDBResponse> {
  const { data } = await tmdb.get(`/trending/${media}/week`, {
    params: { page },
  })
  return data
}

export async function getPopular(media: 'movie' | 'tv', page = 1): Promise<TMDBResponse> {
  const { data } = await tmdb.get(`/${media}/popular`, {
    params: { page },
  })
  return data
}

export async function getTopRated(media: 'movie' | 'tv', page = 1): Promise<TMDBResponse> {
  const { data } = await tmdb.get(`/${media}/top_rated`, {
    params: { page },
  })
  return data
}

export async function getGenres(media: 'movie' | 'tv'): Promise<{ genres: { id: number; name: string }[] }> {
  const { data } = await tmdb.get(`/genre/${media}/list`)
  return data
}

export async function discoverMovies(genre?: string, page = 1): Promise<TMDBResponse> {
  const params: Record<string, string | number> = { page }
  if (genre) params.with_genres = genre

  const { data } = await tmdb.get('/discover/movie', { params })
  return data
}

export async function discoverTVShows(genre?: string, page = 1): Promise<TMDBResponse> {
  const params: Record<string, string | number> = { page }
  if (genre) params.with_genres = genre

  const { data } = await tmdb.get('/discover/tv', { params })
  return data
}

export async function searchContent(query: string, page = 1): Promise<TMDBResponse> {
  const { data } = await tmdb.get('/search/multi', {
    params: { query, page },
  })
  return data
}

export async function getMovieDetails(id: number): Promise<TMDBMovie> {
  const { data } = await tmdb.get(`/movie/${id}`)
  return data
}

export async function getTVDetails(id: number): Promise<TMDBMovie> {
  const { data } = await tmdb.get(`/tv/${id}`)
  return data
}

// For video trailer (mock)
export async function getVideos(id: number, type: 'movie' | 'tv'): Promise<TMDBVideo | undefined> {
  const { data } = await tmdb.get(`/${type}/${id}/videos`)
  return data.results.find((video: unknown) => (video as TMDBVideo).type === 'Trailer' && (video as TMDBVideo).site === 'YouTube')
}
