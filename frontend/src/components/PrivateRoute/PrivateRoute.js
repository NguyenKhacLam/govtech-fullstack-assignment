import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {
  if (loading) return <Spinner />;
  if (isAuthenticated) return <Outlet />;

  return <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
