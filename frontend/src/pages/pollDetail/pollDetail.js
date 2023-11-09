import { Box, Button, Container, List, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import OptionItem from "../../components/OptionItem/OptionItem";
import Spinner from "../../components/Spinner/Spinner";
import { getPoll, votePoll } from "./../../redux/actions/poll";

let socket;

const Polldetail = ({ getPoll, votePoll, poll: { poll, loading } }) => {
  const { id } = useParams();

  useEffect(() => {
    getPoll(id);
  }, [getPoll, id]);

  useEffect(() => {
    socket = io("http://localhost:8000");
    socket.emit("join poll", { id: Number(id) });
    socket.on("user voted", (newVote) => {
      console.log(newVote, ">>>");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleVote = (optionId) => {
    console.log("voted");
    socket.emit("vote", { poll: Number(id), option: optionId });
    votePoll(Number(id), optionId);
  };

  return loading || !poll ? (
    <Spinner />
  ) : (
    <Container>
      <Link to="/">Back</Link>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Typography variant="h4">{poll.name}</Typography>
          <Typography variant="subtitle1">1</Typography>
        </div>
        <Button variant="contained">Edit poll</Button>
      </Box>

      <List>
        {poll &&
          poll.options.map((option, index) => (
            <OptionItem
              option={option}
              totalVote={poll.totalVote}
              key={index}
              handleVote={handleVote}
            />
          ))}
      </List>
    </Container>
  );
};

Polldetail.propTypes = {
  getPoll: PropTypes.func.isRequired,
  poll: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  poll: state.polls,
});

export default connect(mapStateToProps, { getPoll, votePoll })(Polldetail);
