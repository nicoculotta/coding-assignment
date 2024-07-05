import Movie from './Movie'
import '../styles/movies.scss'

import { useRef } from 'react'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import useMovies from '../hooks/useMovies'

const Movies = () => {
  const { loadMore, movieList, searchQuery } = useMovies()

  //Infinite Scroll
  const infiniteScrollRef = useRef(null)

  const infiniteOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  }

  useInfiniteScroll({
    targetRef: infiniteScrollRef,
    IntersactionObserverOptions: infiniteOptions,
    handler: loadMore,
  })

  return (
    <>
      {movieList.length === 0 && (
        <div className="text-center">
          <p>No results on your search</p>
        </div>
      )}
      <div data-testid="movies" className="movies_grid">
        {movieList.map((movie) => {
          return <Movie movie={movie} key={movie.id} />
        })}
      </div>

      {!searchQuery && (
        <div className="infinite" ref={infiniteScrollRef}>
          <div className="loader"></div>
        </div>
      )}
    </>
  )
}

export default Movies
