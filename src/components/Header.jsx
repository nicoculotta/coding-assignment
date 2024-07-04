import {
  createSearchParams,
  Link,
  NavLink,
  useSearchParams,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../constants'
import { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import {
  clearMovies,
  clearPage,
  clearSearchResults,
  fetchMovies,
} from '../data/moviesSlice'
import '../styles/header.scss'

const Header = () => {
  const { starredMovies } = useSelector((state) => state.starred)
  const { currentPage } = useSelector((state) => state.movies)
  const dispatch = useDispatch()

  //TODO: this could be a custom hook
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

  return (
    <header>
      <Link
        to="/"
        data-testid="home"
        onClick={() => {
          handleSearch()
          setSearchValue('')
        }}
      >
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink
          to="/starred"
          data-testid="nav-starred"
          className="nav-starred"
        >
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <input
          type="text"
          data-testid="search-movies"
          className="form-control rounded search-link"
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-describedby="search-addon"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
      </div>
    </header>
  )
}

export default Header
