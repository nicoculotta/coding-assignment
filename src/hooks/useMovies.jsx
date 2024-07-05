import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { fetchMovies, incrementPage } from '../data/moviesSlice'
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../constants'

const useMovies = () => {
  const { movies, searchResults, currentPage } = useSelector(
    (state) => state.movies
  )
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
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

  useEffect(() => {
    getMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchQuery])

  const loadMore = () => {
    if (!isLoading) {
      setTimeout(() => {
        dispatch(incrementPage())
      }, 1000)
    }
  }

  const movieList = searchQuery ? searchResults : movies

  return {
    movieList,
    searchQuery,
    loadMore,
  }
}

export default useMovies
