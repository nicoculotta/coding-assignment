import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchMovieById = createAsyncThunk(
  'fetch-movie',
  async (apiUrl) => {
    try {
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()

      // Check if the data has the expected structure
      if (data.videos && data.videos.results.length) {
        const trailer = data.videos.results.find(
          (vid) => vid.type === 'Trailer'
        )
        return trailer ? trailer.key : data.videos.results[0].key
      } else {
        throw new Error('No videos found for the movie')
      }
    } catch (error) {
      console.log(error)
    }
  }
)

const movieTrailerSlice = createSlice({
  name: 'movieTrailer',
  initialState: {
    videoKey: '',
    fetchStatus: '',
    modal: false,
  },
  reducers: {
    openModal: (state) => {
      state.modal = true
    },
    closeModal: (state) => {
      state.modal = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.videoKey = action.payload
        state.fetchStatus = 'success'
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.fetchStatus = 'loading'
      })
      .addCase(fetchMovieById.rejected, (state) => {
        state.fetchStatus = 'error'
      })
  },
})

export const { openModal, closeModal } = movieTrailerSlice.actions
export default movieTrailerSlice
