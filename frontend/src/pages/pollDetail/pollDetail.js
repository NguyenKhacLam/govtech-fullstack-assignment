import { Box, Button, Container, List, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import OptionItem from "../../components/OptionItem/OptionItem";
import Spinner from "../../components/Spinner/Spinner";
import { getPoll, receiveVote, votePoll } from "./../../redux/actions/poll";

let socket;

const Polldetail = ({
  getPoll,
  votePoll,
  receiveVote,
  poll: { poll, loading },
  user: { id },
}) => {
  const { pollId } = useParams();

  useEffect(() => {
    getPoll(pollId);
  }, [getPoll, pollId]);

  useEffect(() => {
    socket = io("http://localhost:8000");
    socket.emit("join poll", { id: Number(pollId) });
    socket.on("user voted", (newVote) => {
      console.log(newVote, ">>>");
      receiveVote(newVote);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleVote = (optionId) => {
    console.log("voted");
    socket.emit("vote", { pollId: Number(pollId), optionId: optionId });
    votePoll(Number(pollId), optionId);
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
              canVote={poll.userId !== id && poll.userCanVote}
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
  user: state.auth.user,
});

export default connect(mapStateToProps, { getPoll, votePoll, receiveVote })(
  Polldetail
);
