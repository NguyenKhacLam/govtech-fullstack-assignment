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
import { useEffect, useMemo, useState } from "react";
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
  deletePoll,
  votePoll,
  receiveVote,
  poll: { poll, loading },
  user,
}) => {
  const { _id } = user || {};

  const navigate = useNavigate();

  const { pollId } = useParams();

  const [currentId, setCurrentId] = useState();

  useEffect(() => {
    getPoll(pollId);
  }, [pollId]);

  useEffect(() => {
    socket = io("http://localhost:8000");
    socket.emit("join poll", { id: pollId });
    socket.on("user voted", (newVote) => {
      console.log(newVote, ">>>");
      receiveVote(newVote);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleVote = () => {
    socket.emit("vote", { pollId: pollId, optionId: currentId });
    votePoll(pollId, currentId);
  };

  const handleDeletePoll = () => {
    deletePoll(pollId, () => {
      navigate("/");
    });
  };

  const handleOnChange = (id) => {
    setCurrentId(id);
  };

  const canVote = useMemo(
    () => poll?.userId !== _id && poll?.userCanVote,
    [poll, _id]
  );

  return loading || !poll ? (
    <Spinner />
  ) : (
    <Container sx={{ height: " 100vh", padding: 2 }}>
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
        </div>
        {poll?.userId === _id && (
          <Button variant="contained" color="error" onClick={handleDeletePoll}>
            Close poll
          </Button>
        )}
      </Box>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Stack spacing={2}>
            {poll &&
              poll?.options.map((option, index) => (
                <OptionItem
                  option={option}
                  totalVote={poll?.totalVote}
                  key={index}
                  currentId={currentId}
                  value={option?._id}
                  onChange={handleOnChange}
                  canVote={canVote}
                />
              ))}
          </Stack>
          {canVote && (
            <Box display="flex" justifyContent="end" alignItems="center" mt={2}>
              <Button variant="contained" onClick={handleVote}>
                Vote
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {poll?.userId === _id && (
        <Box>
          <BarChart
            chartData={poll?.options.map((item) => item.count)}
            chartLabels={poll?.options.map((item) => item.name)}
          />
        </Box>
      )}
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

export default connect(mapStateToProps, {
  getPoll,
  votePoll,
  receiveVote,
  deletePoll,
})(Polldetail);
