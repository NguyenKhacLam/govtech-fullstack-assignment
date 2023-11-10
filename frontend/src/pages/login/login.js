import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
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
          <Typography variant="h4">Sign in</Typography>

          <Box display="flex" gap={0.5} sx={{ mt: 2, mb: 2 }}>
            <Typography variant="body2">Don't have an account yet?</Typography>
            <Link to="/register">
              <Typography variant="subtitle2" sx={{ ml: 0.5 }}>
                Register an account
              </Typography>
            </Link>
          </Box>
          <>
            <Stack spacing={3}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={onChange}
                margin="normal"
                fullWidth
                name="email"
                InputLabelProps={{ shrink: true }}
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
                InputLabelProps={{ shrink: true }}
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
              Sign In
            </Button>
          </>
        </Card>
      </Stack>
    </Box>
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
