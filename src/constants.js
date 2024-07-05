export const API_KEY = process.env.REACT_APP_API_KEY
export const ENDPOINT = `https://api.themoviedb.org/3`
export const ENDPOINT_DISCOVER = `${ENDPOINT}/discover/movie?api_key=${API_KEY}&sort_by=vote_count.desc`
export const ENDPOINT_SEARCH = `${ENDPOINT}/search/movie?api_key=${API_KEY}`
export const ENDPOINT_MOVIE_BY_ID = (id) =>
  `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
