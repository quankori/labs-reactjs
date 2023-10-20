import React from "react";
import { Box, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

export const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#EFF4FD",
        padding: "50px",
      }}
      component="footer"
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          <Link color="inherit" href="https://quankori.github.io/">
            Project interview
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
};
