import express, { Router } from "express";
import dotenv from "dotenv";

import movieRouter from "./routes/movie.route.js";

const app = express();
app.use(express.json());

dotenv.config({ path: [".env", "../.env"] });
const NODE_ENV = process.env.NODE_ENV || "development";
console.log(`App running in ${NODE_ENV} mode`);

// Serve the frontend - SPA - Static rendering
if (NODE_ENV === "production") {
  app.use(express.static("../frontend/dist"));
}

const apiRouter = Router();
app.use("/api", apiRouter);

apiRouter.use("/movies", movieRouter);

export default app;
