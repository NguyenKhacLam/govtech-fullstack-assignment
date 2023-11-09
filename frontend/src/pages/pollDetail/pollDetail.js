import { Box, Button, Container, List, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import OptionItem from "../../components/OptionItem/OptionItem";
import Spinner from "../../components/Spinner/Spinner";
import { getPoll } from "./../../redux/actions/poll";

const Polldetail = ({ getPoll, poll: { poll, loading } }) => {
  const { id } = useParams();
  const [totalVote, setTotalVote] = useState(0);

  useEffect(() => {
    getPoll(id);
    setTotalVote(
      poll.options.reduce((total, option) => total + option.count, 0)
    );
  }, [getPoll, id]);

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
        {poll.options.map((option, index) => (
          <OptionItem option={option} totalVote={totalVote} key={index} />
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

export default connect(mapStateToProps, { getPoll })(Polldetail);
