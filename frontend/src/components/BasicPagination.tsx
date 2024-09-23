import { Stack, Pagination } from "@mui/material";
import { getAllMovies } from "../services/api.service";
import { Pagination as IPagination } from "../../../backend/src/interfaces/movie.dto";
import { ChangeEvent } from "react";

interface Props {
  count: number;
  defaultPage?: number;
  siblingCount?: number;
  setPage: React.Dispatch<React.SetStateAction<IPagination | undefined>>;
}

export default function BasicPagination({
  count,
  defaultPage = 1,
  siblingCount = 1,
  setPage,
}: Props) {
  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    getAllMovies(value).then((data) => {
      setPage(data);
    });
  };

  return (
    <Stack spacing={1}>
      <Pagination
        count={count}
        defaultPage={defaultPage}
        siblingCount={siblingCount}
        onChange={handleChange}
      />
    </Stack>
  );
}
