import {
  Card,
  CardActionArea,
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
          <Typography
            gutterBottom
            variant="h4"
            component="h2"
            sx={{ fontWeight: "bold" }}
          >
            {movie.title}
          </Typography>
          <Grid2
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            container
            spacing={2}
          >
            <Grid2 size={5}>
              <Typography
                component="h3"
                sx={{
                  color: "text.secondary",
                  marginTop: 2,
                  listStyleType: "none",
                  fontWeight: "bold",
                }}
              >
                Release date :
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                }}
              >
                {new Date(movie.release_date).toLocaleDateString("en-US", {
                  dateStyle: "long",
                })}
              </Typography>
              <Typography
                component="h3"
                sx={{
                  marginTop: 1,
                  color: "text.secondary",
                  fontWeight: "bold",
                }}
              >
                Genres:
              </Typography>
              <ul style={{ marginTop: 0 }}>
                <Typography
                  sx={{
                    color: "text.secondary",
                    listStyleType: "circle",
                  }}
                >
                  {movie.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </Typography>
              </ul>
            </Grid2>
            <Grid2 size={5}>
              {movie.poster_path ? (
                <img src={movie.poster_path} style={{ width: "100%" }}></img>
              ) : (
                <div></div>
              )}
            </Grid2>
          </Grid2>
          <Typography sx={{ color: "text.secondary", marginTop: 2 }}>
            {movie.overview}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
