import { Button, Container, TextField, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { login } from "./../../redux/actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Container maxWidth="xs">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={onChange}
          margin="normal"
          fullWidth
          name="email"
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={onChange}
          margin="normal"
          fullWidth
          name="password"
        />
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Login
        </Button>
        <Typography align="center" marginTop={1}>
          Don't have an account yet?
          <Link to="/register">Register an account</Link>
        </Typography>
      </div>
    </Container>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
