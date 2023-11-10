import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { login } from "./../../redux/actions/auth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email invalid"),
  password: yup.string().required('Password is required').min(6, "Please enter min 6 character")
  .max(12, "Please enter max 12 character"),
});

const Login = ({ login, isAuthenticated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all'
  });

  const onSubmit = ({email, password}) => {
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
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={3}>
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
                  error={!!errors.password}
                  name="password"
                  label={
                    errors.password ? errors.password?.message : "Password"
                  }
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
                Sign In
              </Button>
            </form>
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
