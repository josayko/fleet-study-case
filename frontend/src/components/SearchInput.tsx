import { Paper, IconButton, InputBase } from "@mui/material";
import Search from "@mui/icons-material/Search";

export default function SearchInput() {
  return (
    <Paper component="form" sx={{ display: "flex", alignItems: "center" }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Movie"
        inputProps={{ "aria-label": "search movie" }}
      />
      <IconButton disabled sx={{ p: "10px" }} aria-label="search">
        <Search />
      </IconButton>
    </Paper>
  );
}
