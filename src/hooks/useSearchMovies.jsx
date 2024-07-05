import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../constants'
import { useDebounce } from './useDebounce'
import {
  clearMovies,
  clearPage,
  clearSearchResults,
  fetchMovies,
} from '../data/moviesSlice'

const useSearchMovies = () => {
  const { currentPage } = useSelector((state) => state.movies)
  const dispatch = useDispatch()

  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')

  const [searchValue, setSearchValue] = useState(searchQuery ? searchQuery : '')
  const debounceSearch = useDebounce(searchValue, 500)

  const handleSearch = () => {
    if (searchValue?.length > 0) {
      dispatch(clearMovies())
      dispatch(fetchMovies({ apiUrl: ENDPOINT_SEARCH, query: searchValue }))
      setSearchParams(createSearchParams({ search: searchValue }))
    } else {
      dispatch(clearMovies())
      dispatch(clearSearchResults())
      dispatch(clearPage())
      dispatch(fetchMovies({ apiUrl: ENDPOINT_DISCOVER, page: currentPage }))
      setSearchParams()
    }
  }

  useEffect(() => {
    handleSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch])

  return {
    searchValue,
    setSearchValue,
    handleSearch,
  }
}

export default useSearchMovies
