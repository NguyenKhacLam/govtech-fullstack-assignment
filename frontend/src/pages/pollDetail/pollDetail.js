import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { PropTypes } from "prop-types";
import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import BarChart from "../../components/Chart/Bar/BarChart";
import OptionItem from "../../components/OptionItem/OptionItem";
import Spinner from "../../components/Spinner/Spinner";
import {
  deletePoll,
  getPoll,
  receiveVote,
  votePoll,
} from "./../../redux/actions/poll";

let socket;

const Polldetail = ({
  getPoll,
  votePoll,
  deletePoll,
  receiveVote,
  poll: { poll, loading },
  user: { id },
}) => {
  const { pollId } = useParams();
  const navigate = useNavigate();

  const canVote = useMemo(
    () => poll?.userId !== id && poll?.userCanVote,
    [poll, id]
  );

  useEffect(() => {
    getPoll(pollId);
  }, [getPoll, pollId]);

  useEffect(() => {
    socket = io(process.env.SOCKET_ENDPOINT);
    socket.emit("join poll", { id: Number(pollId) });
    socket.on("user voted", (newVote) => {
      receiveVote(newVote);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleVote = (optionId) => {
    socket.emit("vote", { pollId: Number(pollId), optionId: optionId });
    votePoll(Number(pollId), optionId);
  };

  const handleDeletePoll = () => {
    deletePoll(pollId);
    navigate("/");
  };

  return loading || !poll ? (
    <Spinner />
  ) : (
    <Container>
      <Box sx={{ mb: 1 }}>
        <Link to="/">Back</Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Typography variant="h4">{poll?.name}</Typography>
          <Typography variant="subtitle1">{poll?.description}</Typography>
        </div>
        <Button variant="contained" color="error" onClick={handleDeletePoll}>
          Close poll
        </Button>
      </Box>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Stack spacing={2}>
            {poll &&
              poll?.options.map((option, index) => (
                <OptionItem
                  option={option}
                  totalVote={poll?.totalVote || 0}
                  key={index}
                  handleVote={handleVote}
                  canVote={canVote}
                />
              ))}
          </Stack>
        </CardContent>
      </Card>

      {poll?.userId === id && (
        <BarChart
          chartData={poll.options.map((item) => item.count)}
          chartLabels={poll.options.map((item) => item.name)}
        />
      )}
    </Container>
  );
};

Polldetail.propTypes = {
  getPoll: PropTypes.func.isRequired,
  votePoll: PropTypes.func.isRequired,
  receiveVote: PropTypes.func.isRequired,
  deletePoll: PropTypes.func.isRequired,
  poll: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  poll: state.polls,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getPoll,
  votePoll,
  receiveVote,
  deletePoll,
})(Polldetail);
