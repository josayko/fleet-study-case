import { useEffect, useState } from "react";
import { Button, ButtonGroup, Container } from "@mui/material";
import { getAllMovies } from "./services/api.service";
import { Pagination } from "../../backend/src/interfaces/movie.dto";

function App() {
  const [pagination, setPage] = useState<Pagination>();
  const [pageButtons, setPageButtons] = useState<JSX.Element[]>([]);

  useEffect(() => {
    getAllMovies().then((data) => {
      setPage(data);
      computePageButtons(data);
    });
  }, []);

  const updatePage = (nb: number) => {
    getAllMovies(nb).then((data) => {
      setPage(data);
      computePageButtons(data);
    });
  };

  const pageButton = (nb: number) => {
    return (
      <Button key={nb} onClick={() => updatePage(nb)}>
        {nb}
      </Button>
    );
  };

  const computePageButtons = (pagination: Pagination) => {
    const buttons: JSX.Element[] = [];
    if (pagination.page > 1) {
      buttons.push(pageButton(pagination.page));
    }
    for (let i = pagination.page; i < 5; i++) {
      if (i >= pagination.total_pages) {
        break;
      }
      buttons.push(pageButton(i));
    }
    setPageButtons(buttons);
  };

  const listMovies = () => {
    if (pagination) {
      return (
        <div>
          <ul>
            {pagination.results.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
          <ButtonGroup size="small" aria-label="Small button group">
            {pageButtons}
          </ButtonGroup>
        </div>
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
