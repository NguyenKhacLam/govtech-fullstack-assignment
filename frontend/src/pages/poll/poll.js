import { Container, Grid } from "@mui/material";
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

  return loading ? (
    <Spinner />
  ) : (
    <Container>
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
