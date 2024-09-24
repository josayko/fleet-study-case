import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import { getAllMovies } from "./services/api.service";
import { Movie, Pagination } from "../../backend/src/interfaces/movie.dto";
import BasicPagination from "./components/BasicPagination";
import SearchInput from "./components/SearchInput";
import { MovieDetails } from "./components/MovieDetails";

function App() {
  const [pagination, setPagination] = useState<Pagination>();
  const [page, setPage] = useState<number>(1);
  const [movie, setMovie] = useState<Movie>();
  const [searchMemo, setSearchMemo] = useState("");

  useEffect(() => {
    getAllMovies().then((data) => {
      setPagination(data);
      if (data.results.length) {
        setMovie(data.results[0]);
      }
    });
  }, []);

  const listMovies = () => {
    const handleClick = async (id: string) => {
      // const movie = await getMovieById(id); /* Not necessary because we have all the movies of the selected page */
      const movie = pagination?.results.find((movie) => movie.id === id);
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
      <Typography variant="h2" component="h1">
        Movie DB
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={4}>
          <SearchInput
            searchMemo={searchMemo}
            setSearchMemo={setSearchMemo}
            setPage={setPage}
            setPagination={setPagination}
            setMovie={setMovie}
          />
          {listMovies()}
          {pagination ? (
            <BasicPagination
              count={pagination.total_pages}
              page={page}
              setPagination={setPagination}
              setPage={setPage}
              searchMemo={searchMemo}
            />
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
