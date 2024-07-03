import { useEffect } from 'react'
import {
  Routes,
  Route,
  createSearchParams,
  useSearchParams,
  useNavigate,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'reactjs-popup/dist/index.css'
import { fetchMovies, incrementPage } from './data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from './constants'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import YouTubePlayer from './components/YoutubePlayer'
import './app.scss'
import { closeModal } from './data/movieTrailerSlice'
import { createPortal } from 'react-dom'
import Modal from './components/Modal'

const App = () => {
  const { movies, currentPage } = useSelector((state) => state.movies)
  const { videoKey, modal: trailerModal } = useSelector(
    (state) => state.movieTrailer
  )
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const navigate = useNavigate()

  const getSearchResults = (query) => {
    if (query !== '') {
      dispatch(fetchMovies({ apiUrl: `${ENDPOINT_SEARCH}&query=${query}` }))
      setSearchParams(createSearchParams({ search: query }))
    } else {
      dispatch(fetchMovies({ apiUrl: ENDPOINT_DISCOVER, page: currentPage }))
      setSearchParams()
    }
  }

  const searchMovies = (query) => {
    navigate('/')
    getSearchResults(query)
  }

  const getMovies = () => {
    if (searchQuery) {
      dispatch(
        fetchMovies({
          apiUrl: `${ENDPOINT_SEARCH}&query=${searchQuery}`,
        })
      )
    } else {
      dispatch(fetchMovies({ apiUrl: ENDPOINT_DISCOVER, page: currentPage }))
    }
  }

  useEffect(() => {
    getMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  return (
    <div className="App">
      <Header
        searchMovies={searchMovies}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <div className="container">
        <Routes>
          <Route path="/" element={<Movies movies={movies} />} />
          <Route path="/starred" element={<Starred />} />
          <Route path="/watch-later" element={<WatchLater />} />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>

        <button onClick={() => dispatch(incrementPage())}>get results</button>

        {trailerModal &&
          createPortal(
            <Modal isOpen={trailerModal} onClose={() => dispatch(closeModal())}>
              {videoKey ? (
                <YouTubePlayer videoKey={videoKey} />
              ) : (
                <div>
                  <h6>no trailer available. Try another movie</h6>
                </div>
              )}
            </Modal>,
            document.getElementById('root')
          )}
      </div>
    </div>
  )
}

export default App
