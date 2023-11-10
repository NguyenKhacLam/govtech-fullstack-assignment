import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import { PropTypes } from "prop-types";
import * as React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./../../redux/actions/auth";

const NavBar = ({ isAuthenticated, user, logout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
  };

  return (
    isAuthenticated && (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ marginBottom: 10 }}>
          <Toolbar>
            <Button
              color="success"
              variant="contained"
              component="div"
              onClick={() => navigate("/poll/create")}
            >
              Create Poll
            </Button>
            <div style={{ flexGrow: 1 }}></div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography>{user?.username}</Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                // onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    )
  );
};

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(NavBar);
