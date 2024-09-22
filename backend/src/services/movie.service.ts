import dotenv from "dotenv";

dotenv.config({ path: [".env", "../.env"] });
const BEARER_TOKEN = process.env.API_READ_ACCESS_TOKEN || "";

export interface MovieFromTMDB {
  id: string;
  title: string;
  genres: string[];
  release_date: string;
  overview: string;
}

export type Movie = Omit<MovieFromTMDB, "release_date"> & { date: string };

function isMovieFromTMDB(data: unknown): data is MovieFromTMDB {
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

export const findAll = async () => {
  const data = await new Promise((resolve) =>
    setTimeout(() => {
      return resolve([
        {
          id: 0,
          title: "movie 1",
        },
        {
          id: 1,
          title: "movie 2",
        },
        {
          id: 2,
          title: "movie 3",
        },
      ]);
    }, 500)
  );
  return data;
};

export const findOne = async (id: string): Promise<Movie> => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  if (!isMovieFromTMDB(data)) {
    throw new Error("Error fetching movie data");
  }
  return {
    id: data.id,
    title: data.title,
    genres: data.genres,
    date: data.release_date,
    overview: data.overview,
  };
};
