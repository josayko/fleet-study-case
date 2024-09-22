import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { getAllMovies } from "./services/api.service";

interface IMovie {
  id: string;
  title: string;
}

function App() {
  const [movies, setMovies] = useState<IMovie[]>();

  useEffect(() => {
    getAllMovies().then((data) => setMovies(data));
  }, []);

  const listMovies = () => {
    if (movies) {
      return (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      );
    }
    return <p>Loading...</p>;
  };

  return (
    <Container maxWidth="sm">
      <h1>Movie DB</h1>
      {listMovies()}
    </Container>
  );
}

export default App;
