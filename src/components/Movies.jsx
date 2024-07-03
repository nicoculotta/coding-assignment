import Movie from './Movie'
import '../styles/movies.scss'

const Movies = ({ movies }) => {
  return (
    <div data-testid="movies" className="movies_grid">
      {movies?.map((movie) => {
        return <Movie movie={movie} key={movie.id} />
      })}
    </div>
  )
}

export default Movies
