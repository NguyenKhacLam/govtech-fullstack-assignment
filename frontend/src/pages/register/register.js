import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
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

  const [error, setError] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const { username, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: e.target.value === "" });
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
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
            borderRadius: 2,
          }}
        >
          <Typography variant="h4">Register</Typography>

          <Box display="flex" gap={0.5} sx={{ mt: 2, mb: 2 }}>
            <Typography variant="body2"> Already have an account?</Typography>
            <Link to="/login">
              <Typography variant="subtitle2" sx={{ ml: 0.5 }}>
                Sign In
              </Typography>
            </Link>
          </Box>
          <>
            <Stack spacing={3}>
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Username"
                type="text"
                variant="outlined"
                value={username}
                onChange={onChange}
                margin="normal"
                fullWidth
                name="username"
                required
                helperText="Please enter username"
                error={error.username}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={onChange}
                margin="normal"
                fullWidth
                name="email"
                required
                helperText="Please enter email"
                error={error.email}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={onChange}
                margin="normal"
                fullWidth
                name="password"
                required
                helperText="Please enter password"
                error={error.password}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Confirm password"
                type="password"
                variant="outlined"
                value={confirmPassword}
                onChange={onChange}
                margin="normal"
                fullWidth
                name="confirmPassword"
                required
                helperText="Please reenter password"
                error={error.confirmPassword}
              />
            </Stack>

            <Button
              sx={{ mt: 3 }}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              onClick={onSubmit}
            >
              Register
            </Button>
          </>
        </Card>
      </Stack>
    </Box>
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
