import mongoose from 'mongoose'

const MovieSchema = new mongoose.Schema({
  tmdbId: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  posterPath: String,
  backdropPath: String,
  releaseDate: String,
  genreIds: [Number],
  voteAverage: Number,
  voteCount: Number,
  popularity: Number,
  adult: Boolean,
  video: Boolean,
  originalLanguage: String,
  mediaType: {
    type: String,
    enum: ['movie', 'tv'],
    required: true,
  },
  // Additional fields for TV shows
  firstAirDate: String,
  name: String,
  originalName: String,
  originCountry: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema)
