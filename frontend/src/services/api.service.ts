import { Movie, Pagination } from "../../../backend/src/interfaces/movie.dto";

export async function getAllMovies(page?: number): Promise<Pagination> {
  const query = page ? `?page=${page}` : "";
  const response = await fetch(`/api/movies${query}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  return await response.json();
}

export async function getMovieById(id: string): Promise<Movie> {
  const response = await fetch(`/api/movies/${id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  return response.json();
}

export async function getAllMoviesByTitle(
  title: string,
  page = 1
): Promise<Pagination> {
  const response = await fetch(`/api/movies?title=${title}&page=${page}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  return await response.json();
}
