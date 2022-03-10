import React from "react";
import "./App.css";
import { QaForm } from "./features/qa/components/QaForm";
import { QaPosts } from "./features/qa/components/QaPosts";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{ height: "100vh", bgcolor: "#f3f3f3", overflow: "auto" }}
        >
          <div className="App">
            <Typography
              className="qa-header"
              variant="h3"
              component="div"
              gutterBottom
            >
              The Awesome Q/A tool
            </Typography>
            <QaForm />
            <QaPosts />
          </div>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default App;
