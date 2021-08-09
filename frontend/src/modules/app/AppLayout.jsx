import {
  AppBar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useStyles } from "./styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { AppContext } from "../common/AppContext";
import { useHistory } from "react-router-dom";

const MenuIndex = {
  Account: 0,
  Logout: 1,
  Login: 2,
  Signup: 3,
};

const AppLayout = ({ children }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user } = useContext(AppContext);
  const history = useHistory();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openShoppingCart = () => {};

  const handleMenuClick = (menuIndex) => {
    switch (menuIndex) {
      case MenuIndex.Account:
        break;
      case MenuIndex.Logout:
        break;
      case MenuIndex.Login:
        history.push("/login");
        break;
      case MenuIndex.Signup:
        history.push("/signup");
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Shadang
          </Typography>
          <div>
            <IconButton onClick={openShoppingCart} color="inherit">
              <Badge badgeContent={1} color="secondary">
                <ShoppingCartIcon fontSize="large" />
              </Badge>
            </IconButton>

            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle fontSize="large" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              {user && (
                <MenuItem onClick={() => handleMenuClick(MenuIndex.Account)}>
                  Profile
                </MenuItem>
              )}
              {user && (
                <MenuItem onClick={() => handleMenuClick(MenuIndex.Logout)}>
                  Logout
                </MenuItem>
              )}

              {!user && (
                <MenuItem onClick={() => handleMenuClick(MenuIndex.Login)}>
                  Login
                </MenuItem>
              )}
              {!user && (
                <MenuItem onClick={() => handleMenuClick(MenuIndex.Signup)}>
                  Create account
                </MenuItem>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.appBody}>{children}</div>
    </div>
  );
};

export { AppLayout };
