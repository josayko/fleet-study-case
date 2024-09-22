import { useState } from "react";
import { Button, Container } from "@mui/material";

function App() {
  const [count, setCount] = useState(0);
  return (
    <Container maxWidth="sm">
      <h1>Example counter</h1>
      <Button
        onClick={() => setCount((count) => count + 1)}
        variant="contained"
        color="secondary"
      >
        count is {count}
      </Button>
    </Container>
  );
}

export default App;
