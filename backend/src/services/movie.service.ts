import dotenv from "dotenv";
import {
  isMovieFromTMDB,
  type Genre,
  type Movie,
  type Pagination,
  type PaginationFromTMDB,
} from "../interfaces/movie.dto.js";

dotenv.config({ path: [".env", "../.env"] });
const BEARER_TOKEN = process.env.API_READ_ACCESS_TOKEN || "";

export const getGenres = async () => {
  const url = "https://api.themoviedb.org/3/genre/movie/list";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  };
  const response = await fetch(url, options);
  const result = (await response.json()) as { genres: Genre[] };
  return result.genres;
};

export const findAll = async (page?: string): Promise<Pagination> => {
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
  const genres = new Map((await getGenres()).map((genre) => [genre.id, genre]));
  return {
    page: data.page,
    results: data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      genres: movie.genre_ids
        .map((id) => genres.get(id) ?? undefined)
        .filter((genre) => genre != undefined),
      release_date: movie.release_date,
      overview: movie.overview,
      poster_path: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
    })),
    total_pages: data.total_pages > 500 ? 500 : data.total_pages,
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
    release_date: result.release_date,
    overview: result.overview,
    poster_path: `https://image.tmdb.org/t/p/w500/${result.poster_path}`,
  };
};
