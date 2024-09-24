import { Paper, IconButton, InputBase, Typography } from "@mui/material";
import Search from "@mui/icons-material/Search";
import { useState } from "react";
import { getAllMovies, getAllMoviesByTitle } from "../services/api.service";
import {
  Pagination as IPagination,
  Movie,
} from "../../../backend/src/interfaces/movie.dto";

interface Props {
  searchMemo: string;
  setSearchMemo: React.Dispatch<React.SetStateAction<string>>;
  setPagination: React.Dispatch<React.SetStateAction<IPagination | undefined>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>;
}

export default function SearchInput({
  searchMemo,
  setSearchMemo,
  setPagination,
  setPage,
  setMovie,
}: Props) {
  const [searchValue, setSearchValue] = useState("");

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!searchValue) {
      getAllMovies().then((data) => {
        setPagination(data);
        if (data.results.length) {
          setMovie(data.results[0]);
        } else {
          setMovie(undefined);
        }
      });
    }
    const data = await getAllMoviesByTitle(searchValue);
    setPagination(data);
    setPage(1);
    if (data.results.length) {
      setMovie(data.results[0]);
    } else {
      setMovie(undefined);
    }
    setSearchMemo(searchValue);
    setSearchValue("");
  };

  return (
    <>
      <Paper component="form" sx={{ display: "flex", alignItems: "center" }}>
        <InputBase
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Movie"
          inputProps={{ "aria-label": "search movie" }}
        />
        <IconButton
          type="submit"
          onClick={handleClick}
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <Search />
        </IconButton>
      </Paper>
      <Typography
        sx={{
          fontStyle: "italic",
          pt: 1,
        }}
        variant="body2"
      >
        Results for : {`" ${searchMemo} "`}
      </Typography>
    </>
  );
}
