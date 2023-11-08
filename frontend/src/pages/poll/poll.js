import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import React from "react";

const Poll = () => {
  const posts = [
    {
      title: "Post 1",
      body: "This is the content of Post 1.",
    },
    {
      title: "Post 2",
      body: "This is the content of Post 2.",
    },
    // Add more posts as needed
  ];

  return (
    <Container>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {posts.map((post, index) => (
          <Card key={index} variant="outlined" style={{ margin: "8px" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {post.body}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Poll;
