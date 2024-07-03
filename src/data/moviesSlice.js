import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchMovies = createAsyncThunk(
  'fetch-movies',
  async ({ apiUrl, page }) => {
    const response = await fetch(`${apiUrl}&page=${page}`)
    return response.json()
  }
)

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    fetchStatus: '',
    currentPage: 1,
  },
  reducers: {
    incrementPage: (state) => {
      state.currentPage += 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        //Some logic to prevent duplicate results due to react in dev mode re-render twice, we can avoid this behavior removing the strict mode.
        const newMovies = [...state.movies, ...action.payload.results]
        state.movies = newMovies.reduce((accMovie, currentMovie) => {
          if (!accMovie.some((movie) => movie.id === currentMovie.id)) {
            accMovie.push(currentMovie)
          }
          return accMovie
        }, [])
        state.fetchStatus = 'success'
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = 'loading'
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = 'error'
      })
  },
})

export const { incrementPage } = moviesSlice.actions
export default moviesSlice
