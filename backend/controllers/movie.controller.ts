import type { Request, Response } from "express";
import { getAllMovies } from "../services/movie.service.js";

export const allMovies = async (_req: Request, res: Response) => {
  try {
    const result = await getAllMovies();
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};
