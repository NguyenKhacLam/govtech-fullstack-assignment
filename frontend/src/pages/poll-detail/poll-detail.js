import { Box, Button, Card, Container, List, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Polldetail = () => {
  const [options, setOptions] = useState([
    { id: 1, text: "Option A", votes: 0 },
    { id: 2, text: "Option B", votes: 0 },
  ]);

  const handleVote = (optionId) => {
    const updatedOptions = options.map((option) =>
      option.id === optionId ? { ...option, votes: option.votes + 1 } : option
    );
    setOptions(updatedOptions);
  };

  return (
    <Container>
      <Link to="/">Back</Link>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Voting Poll</Typography>
        <Button variant="contained">Edit poll</Button>
      </Box>

      <List>
        {options.map((option) => (
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
                <Typography level="title-lg">NYC Coders</Typography>
                <Typography>Voted: 3</Typography>
              </Box>
              <Button>Vote</Button>
            </Box>
            <progress value={50} max={100} /> 33%
          </Card>
        ))}
      </List>
    </Container>
  );
};

export default Polldetail;
