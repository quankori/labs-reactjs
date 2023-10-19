import { Button, Collapse, Typography } from "@mui/material";
import React, { useState } from "react";

interface ReadMoreTextProps {
  text: string;
}

export const ReadMoreText: React.FC<ReadMoreTextProps> = ({
  text,
}: ReadMoreTextProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleReadMore = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <Typography variant="body1" component="div">
        <Collapse in={expanded}>
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </Collapse>
        <Collapse in={!expanded}>
          <div dangerouslySetInnerHTML={{ __html: text.slice(0, 200) }} />
        </Collapse>
        {text.length > 200 && (
          <Button onClick={toggleReadMore}>
            {expanded ? "Read Less" : "Read More"}
          </Button>
        )}
      </Typography>
    </div>
  );
};
