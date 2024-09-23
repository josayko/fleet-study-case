import { Movie } from "../../../backend/src/interfaces/movie.dto";

interface Props {
  movie: Movie;
}

export function MovieDetails({ movie }: Props) {
  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.release_date}</p>
      <ul>
        {movie.genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
      <p>{movie.overview}</p>
    </div>
  );
}
