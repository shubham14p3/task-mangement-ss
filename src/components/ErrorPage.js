import React from "react";
import { Typography, Container } from "@mui/material";

const ErrorPage = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h2" color="error" gutterBottom>
        Error: Page Not Found
      </Typography>
      <Typography variant="body1">
        The requested page could not be found.
      </Typography>
    </Container>
  );
};

export default ErrorPage;
