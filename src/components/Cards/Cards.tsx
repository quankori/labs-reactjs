import React from "react";
import { Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";

export const Cards: React.FC = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Statics
        </Typography>
        <Typography variant="h5" component="div"></Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Info statics
        </Typography>
        <Typography variant="body2">Just blank</Typography>
      </CardContent>
    </Card>
  );
};
