import type { Request, Response } from "express";
import { findAll, findOne } from "../services/movie.service.js";

export const allMovies = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? (req.query.page as string) : undefined;
    const result = await findAll(page);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};

export const oneMovie = async (req: Request, res: Response) => {
  const id = req.params.id as string; // TODO: validate id
  try {
    const result = await findOne(id);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};
