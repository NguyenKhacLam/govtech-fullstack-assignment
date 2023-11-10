import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import Navbar from "../appbar/Navbar";
import { Box } from "@mui/material";

const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {
  if (loading) return <Spinner />;
  if (isAuthenticated)
    return (
      <Box display="flex" flexDirection="column">
        <Navbar />
        <Box flex={1}>
          <Outlet />
        </Box>
      </Box>
    );

  return <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
