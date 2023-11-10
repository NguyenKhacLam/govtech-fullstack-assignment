import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { setAlert } from "./../../redux/actions/alert";
import { register } from "./../../redux/actions/auth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = yup.object({
  username: yup.string().required("User name is required"),
  email: yup.string().required("Email is required").email("Email invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Please enter min 6 character")
    .max(12, "Please enter max 12 character"),
  confirmPassword: yup.string().required("Confirm password is required") .oneOf(
    [yup.ref('password'), null],
    'Confirm password not match password',
  ),
})

const Register = ({ register: handleRegister, isAuthenticated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all"
  });

  const onSubmit = ({ username, email, password }) => {
    console.log("submit");
    handleRegister({ username, email, password });
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
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={3}>
                <TextField
                  {...register("username")}
                  name="username"
                  label={
                    errors.username ? errors.username?.message : "User Name"
                  }
                  error={!!errors.username}
                  type="text"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  {...register("email")}
                  name="email"
                  label={errors.email ? errors.email?.message : "Email"}
                  error={!!errors.email}
                  type="email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  {...register("password")}
                  name="password"
                  label={
                    errors.password ? errors.password?.message : "Password"
                  }
                  error={!!errors.password}
                  InputLabelProps={{ shrink: true }}
                  type="password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                />
                <TextField
                  {...register("confirmPassword")}
                  name="confirmPassword"
                  label={
                    errors.confirmPassword
                      ? errors.confirmPassword?.message
                      : "Confirm password"
                  }
                  error={!!errors.confirmPassword}
                  type="password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
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
              >
                Register
              </Button>
            </form>
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
