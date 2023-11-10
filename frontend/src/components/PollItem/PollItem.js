import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function PollItem({ poll }) {
  return (
    <Card key={poll.id} variant="outlined" style={{ margin: "8px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {poll.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {poll.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link to={`poll/${poll._id}`}>Learn More</Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default PollItem;
