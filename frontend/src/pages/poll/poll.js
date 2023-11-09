import { Container } from "@mui/material";
import { PropTypes } from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import PollItem from "../../components/PollItem/PollItem";
import Spinner from "../../components/Spinner/Spinner";
import { getPolls } from "./../../redux/actions/poll";

const Poll = ({ getPolls, pollData: { polls, loading } }) => {
  useEffect(() => {
    getPolls();
  }, [getPolls]);

  return loading ? (
    <Spinner />
  ) : (
    <Container>
      {polls.map((poll, index) => (
        <PollItem poll={poll} key={index} />
      ))}
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
