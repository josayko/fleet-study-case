import { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Container, Grid2 } from "@mui/material";
import { getAllMovies, getMovie } from "./services/api.service";
import { Movie, Pagination } from "../../backend/src/interfaces/movie.dto";
import BasicPagination from "./components/BasicPagination";
import SearchInput from "./components/SearchInput";
import { MovieDetails } from "./components/MovieDetails";

function App() {
  const [pagination, setPage] = useState<Pagination>();
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    getAllMovies().then((data) => {
      console.log(data.results);
      setPage(data);
      if (data.results.length) {
        console.log(data.results[0]);
        setMovie(data.results[0]);
      }
    });
  }, []);

  const listMovies = () => {
    const handleClick = async (id: string) => {
      const movie = await getMovie(id);
      console.log(movie);
      setMovie(movie);
    };

    if (pagination) {
      return (
        <Box
          sx={{
            display: "flex",
            "& > *": {
              flexGrow: 1,
              marginY: 1,
            },
          }}
        >
          <ButtonGroup
            orientation="vertical"
            aria-label="Vertical button group"
          >
            {pagination.results.map((movie) => (
              <Button
                key={movie.id}
                size="small"
                onClick={() => handleClick(movie.id)}
              >
                {movie.title}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      );
    }
    return <p>Loading...</p>;
  };

  const showMovieDetail = (movie?: Movie) => {
    if (!movie) {
      return <></>;
    }
    return <MovieDetails movie={movie} />;
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        minWidth: "600px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Movie DB</h1>
      <Grid2 container spacing={2}>
        <Grid2 size={4}>
          <SearchInput />
          {listMovies()}
          {pagination ? (
            <BasicPagination count={pagination.total_pages} setPage={setPage} />
          ) : (
            <div></div>
          )}
        </Grid2>
        <Grid2 sx={{ flexGrow: 1 }} size={6}>
          {showMovieDetail(movie)}
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default App;
