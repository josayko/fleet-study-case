export interface MovieFromTMDB {
  id: string;
  title: string;
  genres: string[];
  release_date: string;
  overview: string;
}

export interface PaginationFromTMDB {
  page: number;
  results: MovieFromTMDB[];
  total_pages: number;
  total_results: number;
}

export type Movie = Omit<MovieFromTMDB, "release_date"> & { date: string };
export type Pagination = Omit<PaginationFromTMDB, "results"> & {
  results: Movie[];
};

// validation example, but could be better with a library like zod or ajv
export function isMovieFromTMDB(data: unknown): data is MovieFromTMDB {
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
