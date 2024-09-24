import { Stack, Pagination } from "@mui/material";
import { getAllMovies, getAllMoviesByTitle } from "../services/api.service";
import { Pagination as IPagination } from "../../../backend/src/interfaces/movie.dto";
import { ChangeEvent } from "react";

interface Props {
  count: number;
  searchMemo: string;
  page: number;
  defaultPage?: number;
  siblingCount?: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPagination: React.Dispatch<React.SetStateAction<IPagination | undefined>>;
}

export default function BasicPagination({
  count,
  searchMemo,
  page,
  defaultPage = 1,
  siblingCount = 1,
  setPagination,
  setPage,
}: Props) {
  const handleChange = (_event: ChangeEvent<unknown>, selectedPage: number) => {
    setPage(selectedPage);
    if (searchMemo) {
      getAllMoviesByTitle(searchMemo, selectedPage).then((data) => {
        setPagination(data);
      });
    } else {
      getAllMovies(selectedPage).then((data) => {
        setPagination(data);
      });
    }
  };

  return (
    <Stack spacing={1}>
      <Pagination
        sx={{
          "& .MuiPagination-ul": {
            justifyContent: "center",
          },
        }}
        page={page}
        count={count}
        defaultPage={defaultPage}
        siblingCount={siblingCount}
        onChange={handleChange}
      />
    </Stack>
  );
}
