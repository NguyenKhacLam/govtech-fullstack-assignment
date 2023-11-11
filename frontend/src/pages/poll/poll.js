import { Button, Container, Grid } from "@mui/material";
import { PropTypes } from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import PollItem from "../../components/PollItem/PollItem";
import Spinner from "../../components/Spinner/Spinner";
import { getPolls } from "./../../redux/actions/poll";

const Poll = ({ getPolls, pollData: { polls, loading } = {} }) => {
  useEffect(() => {
    getPolls();
  }, []);

  const handleRefesh = () => {
    getPolls();
  };

  return loading ? (
    <Spinner />
  ) : (
    <Container>
      <Button onClick={handleRefesh} variant="outlined" color="info">
        Refesh
      </Button>
      <Grid container spacing={2}>
        {polls.map((poll, index) => (
          <Grid key={index} item xs={4}>
            <PollItem poll={poll} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

Poll.propTypes = {
  getPolls: PropTypes.func.isRequired,
  pollData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  pollData: state.polls,
});

export default connect(mapStateToProps, { getPolls })(Poll);
