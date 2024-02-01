export const typeDefs = `
type Collection {
  id: ID
  name: String
  poster_path: String
  backdrop_path: String
}
type Company {
  id: ID
  name: String
  logo_path: String
  origin_country: String
}
type Country {
  iso_3166_1: String
  name: String
}
type Language {
  iso_639_1: String
  name: String
}
type VideoResults {
  iso_639_1: String
  iso_3166_1: String
  name: String
  key: String
  published_at: String
  site: String
  size: Int
  type: String
  official: Boolean
  id: String
}
type Video {
  results: [VideoResults]
}
type Image {
  file_path: String
  aspect_ratio: Float
  width: Int
  vote_average: Float
  vote_count: Int
}
type Profiles {
  profiles: [Image]
}
type Images {
  id: ID
  backdrops: [Image]
  posters: [Image]
  logos: [Image]
}
type MediaRecommendations {
  id: ID
  title: String
  image: String
  type: String
  rating: Float
  releaseDate: String
}
type ReviewerDetails {
  name: String
  username: String
  avatar_path: String
  rating: Float
}
type Review {
  id: String
  url: String
  author: String
  author_details: ReviewerDetails
  content: String
  created_at: String
  updated_at: String
}
type Networks {
  id: Int
  logo_path: String
  name: String
  origin_country: String
}
type LastEpisodeToAir {
  id: Int
  name: String
  overview: String
  vote_average: Float
  vote_count: Int
  air_date: String
  episode_number: Int
  episode_type: String
  production_code: String
  runtime: Int
  season_number: Int
  show_id: Int
  still_path: String
}
type CreatedBy {
  id: Int
  credit_id: String
  name: String
  gender: Int
  profile_path: String
}
type SeasonImage {
  mobile: String
  hd: String
}
type Episode {
  id: ID
  title: String
  episode: Int
  Season: Int
  releaseDate: String
  description: String
  url: String
  img: SeasonImage
}
type Season {
  season: Int
  image: SeasonImage
  episodes: [Episode]
  isReleased: Boolean
}
type Trailer {
  id: ID
  url: String
}
type combined_credits {
  cast: [PeopleCredits]
  crew: [PeopleCredits]
}
type People {
  id: ID!
  adult: Boolean
  name: String
  original_name: String
  also_known_as: [String]
  gender: String
  birthday: String
  deathday: String
  place_of_birth: String
  known_for_department: String
  biography: String
  profile_path: String
  images: Profiles
  media_type: String
  known_for: [Media]
  combined_credits: combined_credits
  popularity: Float
}

type Movie {
  title: String
  original_title: String
  release_date: String
  video: Boolean
  id: ID!
  adult: Boolean
  overview: String
  poster_path: String
  backdrop_path: String
  original_language: String
  media_type: String
  genre_ids: [String]
  popularity: Float
  vote_average: Float
  vote_count: Int
  streamingId: String
}

type TV {
  name: String
  original_name: String
  first_air_date: String
  origin_country: [String]
  id: ID!
  adult: Boolean
  overview: String
  poster_path: String
  backdrop_path: String
  original_language: String
  media_type: String
  genre_ids: [String]
  popularity: Float
  vote_average: Float
  vote_count: Int
  streamingId: String
}

type SingleMovie {
  title: String
  original_title: String
  release_date: String
  video: Boolean
  belongs_to_collection: Collection
  budget: Int
  revenue: Int
  runtime: Int
  tagline: String
  homepage: String
  casts: [PeopleCredits]
  videos: Video
  Images: Images
  similar: [MediaRecommendations]
  recommendations: [MediaRecommendations]
  reviews: [Review]
  spoken_languages: [Language]
  status: String
  production_companies: [Company]
  production_countries: [Country]
  imdb_id: String
  id: ID!
  adult: Boolean
  overview: String
  poster_path: String
  backdrop_path: String
  original_language: String
  media_type: String
  genres: [String]
  popularity: Float
  vote_average: Float
  vote_count: Int
  streamingId: String
}

type SingleTV {
  name: String
  original_name: String
  first_air_date: String
  origin_country: [String]
  seasons: [Season]
  type: String
  in_production: Boolean
  last_air_date: String
  next_episode_to_air: String
  networks: [Networks]
  last_episode_to_air: LastEpisodeToAir
  languages: [String]
  episode_run_time: [Int]
  created_by: [CreatedBy]
  number_of_seasons: Int
  number_of_episodes: Int
  trailer: Trailer
  tagline: String
  homepage: String
  casts: [PeopleCredits]
  videos: Video
  Images: Images
  similar: [MediaRecommendations]
  recommendations: [MediaRecommendations]
  reviews: [Review]
  spoken_languages: [Language]
  status: String
  production_companies: [Company]
  production_countries: [Country]
  imdb_id: String
  id: ID!
  adult: Boolean
  overview: String
  poster_path: String
  backdrop_path: String
  original_language: String
  media_type: String
  genres: [String]
  popularity: Float
  vote_average: Float
  vote_count: Int
  streamingId: String
}

union Media = Movie | TV | People

type PeopleCredits {
  name: String
  title: String
  original_title: String
  original_name: String
  gender: String
  known_for_department: String
  profile_path: String
  cast_id: Int
  character: String
  credit_id: String
  job: String
  order: Int
  department: String
  id: ID!
  adult: Boolean
  overview: String
  poster_path: String
  backdrop_path: String
  original_language: String
  media_type: String
  genres: [String]
  popularity: Float
  vote_average: Float
  vote_count: Int
  streamingId: String
}


type PaginatedMedia {
  results: [Media]
  hasNextPage: Boolean
  currentPage: Int
  total_pages: Int
  total_results: Int
}

type PaginatedMovie {
  results: [Movie]
  hasNextPage: Boolean
  currentPage: Int
  total_pages: Int
  total_results: Int
}

type PaginatedTV {
  results: [TV]
  hasNextPage: Boolean
  currentPage: Int
  total_pages: Int
  total_results: Int
}

type PaginatedPeople {
  results: [People]
  hasNextPage: Boolean
  currentPage: Int
  total_pages: Int
  total_results: Int
}

type Query {
  discoverMedia(
    type: String
    dategte: String
    datelte: String
    votesAvglte: Float
    votesAvggte: Float
    votesCountlte: Int
    votesCountgte: Int
    sort: String
    genres: String
    page: Int
  ): PaginatedMedia
  getAnyTrendingToday(page: Int): PaginatedMedia
  getAnyTrendingWeek(page: Int): PaginatedMedia
  getAnybyQuery(query: String!, page: Int): PaginatedMedia
  getMoviebyId(tmdbId: ID!): SingleMovie
  getMoviebyQuery(query: String!, page: Int): PaginatedMovie
  getMovieTrendingToday(page: Int): PaginatedMovie
  getMovieTrendingWeek(page: Int): PaginatedMovie
  getMoviePopular(page: Int): PaginatedMovie
  getMovieUpcoming(page: Int): PaginatedMovie
  getMovieTopRated(page: Int): PaginatedMovie
  getTvbyId(tmdbId: ID!): SingleTV
  getTvbyQuery(query: String!, page: Int): PaginatedTV
  getTvTrendingToday(page: Int): PaginatedTV
  getTvTrendingWeek(page: Int): PaginatedTV
  getTvAiringToday(page: Int): PaginatedTV
  getTvOnTheAir(page: Int): PaginatedTV
  getTvPopular(page: Int): PaginatedTV
  getTvTopRated(page: Int): PaginatedTV
  getPeopleTrendingToday(page: Int): PaginatedPeople
  getPeopleTrendingWeek(page: Int): PaginatedPeople
  getpeoplebyQuery(query: String!, page: Int): PaginatedPeople
  getpeoplebyId(id: ID!): People
}
  `