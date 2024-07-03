import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from './moviesSlice'
import movieTrailerSlice from './movieTrailerSlice'
import starredSlice from './starredSlice'
import watchLaterSlice from './watchLaterSlice'

const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
    starred: starredSlice.reducer,
    watchLater: watchLaterSlice.reducer,
    movieTrailer: movieTrailerSlice.reducer,
  },
})

export default store
