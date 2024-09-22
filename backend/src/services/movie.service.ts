import dotenv from "dotenv";
import {
  isMovieFromTMDB,
  type Movie,
  type Pagination,
  type PaginationFromTMDB,
} from "../interfaces/movie.dto.js";

dotenv.config({ path: [".env", "../.env"] });
const BEARER_TOKEN = process.env.API_READ_ACCESS_TOKEN || "";

export const findAll = async (page?: string): Promise<Pagination> => {
  console.log(page);
  const query = page ? `?page=${page}` : "";
  const url = `https://api.themoviedb.org/3/trending/movie/week${query}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as PaginationFromTMDB; // TODO: validate data from TMDB API
  return {
    page: data.page,
    results: data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      genres: movie.genres,
      date: movie.release_date,
      overview: movie.overview,
    })),
    total_pages: data.total_pages,
    total_results: data.total_results,
  };
};

export const findOne = async (id: string): Promise<Movie> => {
  const url = `https://api.themoviedb.org/3/movie/${id}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  };
  const response = await fetch(url, options);
  const result = await response.json();
  if (!isMovieFromTMDB(result)) {
    throw new Error("Error fetching movie data");
  }
  return {
    id: result.id,
    title: result.title,
    genres: result.genres,
    date: result.release_date,
    overview: result.overview,
  };
};
