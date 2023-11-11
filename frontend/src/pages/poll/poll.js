import { Button, Container, Grid, Pagination, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PollItem from "../../components/PollItem/PollItem";
import Spinner from "../../components/Spinner/Spinner";
import { getPolls } from "./../../redux/actions/poll";

const POLL_PER_PAGE = 10;

const Poll = ({ getPolls, pollData: { polls, loading, total } = {} }) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    getPolls(page, POLL_PER_PAGE);
  }, [page]);

  const handleRefesh = () => {
    getPolls(1, POLL_PER_PAGE);
    setPage(1);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  return loading ? (
    <Spinner />
  ) : (
    <Container>
      <Button onClick={handleRefesh} variant="outlined" color="info">
        Refesh
      </Button>
      <Grid container spacing={2}>
        {polls.length === 0 && <Typography>No Poll</Typography>}
        {polls.map((poll, index) => (
          <Grid key={index} item xs={4}>
            <PollItem poll={poll} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(total / POLL_PER_PAGE)}
        page={page}
        onChange={handleChange}
      />
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
