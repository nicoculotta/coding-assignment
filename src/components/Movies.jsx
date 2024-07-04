import Movie from './Movie'
import '../styles/movies.scss'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../data/moviesSlice'

import { useEffect } from 'react'
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../constants'

const Movies = () => {
  const { movies, searchResults, fetchStatus, searchStatus, currentPage } =
    useSelector((state) => state.movies)
  const dispatch = useDispatch()

  //TODO: this could be a custom hook
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')

  const getMovies = () => {
    if (searchQuery) {
      dispatch(
        fetchMovies({
          apiUrl: ENDPOINT_SEARCH,
          query: searchQuery,
          page: currentPage,
        })
      )
      setSearchParams(createSearchParams({ search: searchQuery }))
    } else {
      dispatch(fetchMovies({ apiUrl: ENDPOINT_DISCOVER, page: currentPage }))
    }
  }

  useEffect(() => {
    getMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchQuery])

  const results = searchQuery ? searchResults : movies

  //TODO: make better loading states
  if (fetchStatus === 'loading' || searchStatus === 'loading') {
    return <>loading....</>
  }

  if (!results) {
    return <>sin resultados</>
  }

  return (
    <div data-testid="movies" className="movies_grid">
      {results.map((movie) => {
        return <Movie movie={movie} key={movie.id} />
      })}
    </div>
  )
}

export default Movies
