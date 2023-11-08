import { Button, Container, TextField, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { setAlert } from "./../../redux/actions/alert";
import { register } from "./../../redux/actions/auth";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setAlert("Password is not matched", "error");
    } else {
      register({ username, email, password });
    }
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
          Register
        </Typography>
        <TextField
          label="Username"
          type="text"
          variant="outlined"
          value={username}
          onChange={onChange}
          margin="normal"
          fullWidth
          name="username"
          required
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={onChange}
          margin="normal"
          fullWidth
          name="email"
          required
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
          required
        />
        <TextField
          label="Confirm password"
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={onChange}
          margin="normal"
          fullWidth
          name="confirmPassword"
          required
        />
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Create account
        </Button>
        <Typography align="center" marginTop={1}>
          Already have an account? <Link to="/login">Sign In</Link>
        </Typography>
      </div>
    </Container>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
