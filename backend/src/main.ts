import express, { Router } from "express";
import dotenv from "dotenv";

import movieRouter from "./routers/movie.router.js";

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
apiRouter.use("/movies", movieRouter); /* /api/movies */

const port = process.env.NODE_PORT || 4000;
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
