import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid2,
} from "@mui/material";
import { Movie } from "../../../backend/src/interfaces/movie.dto";

interface Props {
  movie: Movie;
}

export function MovieDetails({ movie }: Props) {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {movie.title}
          </Typography>
          <Grid2
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
            container
            spacing={2}
          >
            <Grid2 size={5}>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", marginTop: 2 }}
              >
                <p>{movie.release_date}</p>
                <ul>
                  {movie.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
                <p>{movie.overview}</p>
              </Typography>
            </Grid2>
            <Grid2 size={5}>
              <img src={movie.poster_path} style={{ width: "100%" }}></img>
            </Grid2>
          </Grid2>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
