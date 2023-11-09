import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";

function OptionItem({ option, totalVote }) {
  const votePercent = (option.count / totalVote) * 100;

  return (
    <Card
      variant="outlined"
      sx={{
        padding: "1rem",
        margin: "1rem",
        overflow: "auto",
        resize: "horizontal",
      }}
      key={option.id}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography level="title-lg">{option.name}</Typography>
          <Typography>Voted: {option.count}</Typography>
        </Box>
        <Button>Vote</Button>
      </Box>
      <progress value={votePercent} max={100} /> {votePercent}%
    </Card>
  );
}

export default OptionItem;
