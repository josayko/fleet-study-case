import express from "express";
import { allMovies, oneMovie } from "../controllers/movie.controller.js";

const movieRouter = express.Router();

movieRouter.get("/", allMovies);
movieRouter.get("/:id", oneMovie);

export default movieRouter;
