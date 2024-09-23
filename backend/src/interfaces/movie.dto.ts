export interface MovieFromTMDB {
  id: string;
  title: string;
  genre_ids: number[];
  release_date: string;
  overview: string;
  poster_path: string;
}

export interface PaginationFromTMDB {
  page: number;
  results: MovieFromTMDB[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export type Movie = Omit<MovieFromTMDB, "genre_ids"> & {
  genres: Genre[];
};
export type Pagination = Omit<PaginationFromTMDB, "results"> & {
  results: Movie[];
};

// validation example, but could be better with a library like zod or ajv
export function isMovieFromTMDB(data: unknown): data is Movie {
  if (
    data instanceof Object &&
    "id" in data &&
    "title" in data &&
    "genres" in data &&
    "release_date" in data &&
    "overview" in data
  ) {
    return true;
  }
  return false;
}
