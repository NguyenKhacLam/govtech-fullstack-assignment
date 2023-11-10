import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";

function OptionItem({ option, totalVote, handleVote, canVote }) {
  const votePercent = totalVote > 0 ? (option.count / totalVote) * 100 : 0;

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
        {canVote && <Button onClick={() => handleVote(option.id)}>Vote</Button>}
      </Box>
      {!canVote && (
        <div>
          <progress value={votePercent} max={100} />
          {votePercent}%
        </div>
      )}
    </Card>
  );
}

export default OptionItem;
