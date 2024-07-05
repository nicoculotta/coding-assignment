import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ apiUrl, query, page }) => {
    try {
      const response = await fetch(
        `${apiUrl}${query ? `&query=${query}` : ''}&page=${page ? page : 1}`
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      return { data, query: query ? query : '' }
    } catch (error) {
      console.log(error)
    }
  }
)

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    searchResults: [],
    fetchStatus: '',
    searchStatus: '',
    currentPage: 1,
  },
  reducers: {
    incrementPage: (state) => {
      state.currentPage += 1
    },
    clearPage: (state) => {
      state.currentPage = 1
    },
    clearMovies: (state) => {
      state.movies = []
    },
    clearSearchResults: (state) => {
      state.searchResults = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const { data, query } = action.payload
        const { results } = data
        if (query) {
          state.searchResults = data.results
          state.searchStatus = 'success'
          state.currentPage = 1
        } else {
          //Some logic to prevent duplicate results due to react in dev mode re-render twice, we can avoid this behavior removing the strict mode.
          const newMovies = [...state.movies, ...results]
          state.movies = newMovies.reduce((accMovie, currentMovie) => {
            if (!accMovie.some((movie) => movie.id === currentMovie.id)) {
              accMovie.push(currentMovie)
            }
            return accMovie
          }, [])
          state.fetchStatus = 'success'
        }
      })
      .addCase(fetchMovies.pending, (state, action) => {
        const { query } = action.meta.arg
        if (query) {
          state.searchStatus = 'loading'
        } else {
          state.fetchStatus = 'loading'
        }
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        const { query } = action.meta.arg
        if (query) {
          state.searchStatus = 'error'
        } else {
          state.fetchStatus = 'error'
        }
      })
  },
})

export const { incrementPage, clearSearchResults, clearPage, clearMovies } =
  moviesSlice.actions
export default moviesSlice
