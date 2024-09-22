import express from "express";
import { allMovies } from "../controllers/movie.controller.js";

const movieRouter = express.Router();

movieRouter.get("/", allMovies);

export default movieRouter;
