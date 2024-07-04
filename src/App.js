import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'reactjs-popup/dist/index.css'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import YouTubePlayer from './components/YoutubePlayer'
import './app.scss'
import { closeModal } from './data/movieTrailerSlice'
import { createPortal } from 'react-dom'
import Modal from './components/Modal'
import Header from './components/Header'

const App = () => {
  const { videoKey, modal: trailerModal } = useSelector(
    (state) => state.movieTrailer
  )
  const dispatch = useDispatch()

  return (
    <div className="App">
      <Header />

      <div className="container">
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/starred" element={<Starred />} />
          <Route path="/watch-later" element={<WatchLater />} />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>

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
