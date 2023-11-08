import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

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
      <Typography variant="h4">Voting Poll</Typography>
      <List>
        {options.map((option) => (
          <ListItem key={option.id}>
            <ListItemText
              primary={option.text}
              secondary={`Votes: ${option.votes}`}
            />
            <Button variant="outlined" onClick={() => handleVote(option.id)}>
              Vote
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Polldetail;
