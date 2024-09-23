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

export async function getMovie(id: string): Promise<Movie> {
  const response = await fetch(`/api/movies/${id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  return response.json();
}
