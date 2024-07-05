import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../styles/header.scss'
import useSearchMovies from '../hooks/useSearchMovies'

const Header = () => {
  const { starredMovies } = useSelector((state) => state.starred)
  const { handleSearch, setSearchValue, searchValue } = useSearchMovies()

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
