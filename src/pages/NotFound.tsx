import React from "react";
import { Box, Typography } from "@mui/material";

export const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#eff4fd",
      }}
    >
      <Typography variant="h1" style={{ color: "black" }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: "black" }}>
        The page you’re looking for doesn’t exist.
      </Typography>
    </Box>
  );
};
