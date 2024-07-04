import Movie from './Movie'
import '../styles/movies.scss'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies, incrementPage } from '../data/moviesSlice'

import { useState, useEffect, useRef } from 'react'
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../constants'
import useInfiniteScroll from '../hooks/useInfiniteScroll'

const Movies = () => {
  const { movies, searchResults, currentPage } = useSelector(
    (state) => state.movies
  )
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  //TODO: this could be a custom hook
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')

  const getMovies = () => {
    setIsLoading(true)
    if (searchQuery) {
      dispatch(
        fetchMovies({
          apiUrl: ENDPOINT_SEARCH,
          query: searchQuery,
          page: currentPage,
        })
      ).then(() => setIsLoading(false))
      setSearchParams(createSearchParams({ search: searchQuery }))
    } else {
      dispatch(
        fetchMovies({ apiUrl: ENDPOINT_DISCOVER, page: currentPage })
      ).then(() => setIsLoading(false))
    }
  }

  //Infinite Scroll
  const infiniteScrollRef = useRef(null)
  const infiniteOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  }

  const loadMore = () => {
    if (!isLoading) {
      setTimeout(() => {
        dispatch(incrementPage())
      }, 1000)
    }
  }

  useInfiniteScroll({
    targetRef: infiniteScrollRef,
    IntersactionObserverOptions: infiniteOptions,
    handler: loadMore,
  })

  useEffect(() => {
    getMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchQuery])

  const results = searchQuery ? searchResults : movies

  return (
    <>
      {results.length === 0 && (
        <div className="text-center">
          <p>No results for your search</p>
        </div>
      )}
      <div data-testid="movies" className="movies_grid">
        {results.map((movie) => {
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
