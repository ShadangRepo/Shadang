import {
  Button,
  Grid,
  ListSubheader,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import { AppContext } from "../../common/AppContext";
import { CircleAvatar } from "../../common/CircleAvatar";
import { useAuthenticationStyles } from "./authenticationStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { useGlobalStyles } from "../../shared/globalStyles";

const UserProfile = () => {
  const classes = useAuthenticationStyles();
  const globalClasses = useGlobalStyles();
  const { user } = useContext(AppContext);

  return (
    <Paper className={globalClasses.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CircleAvatar
            url={user.profileImage}
            size={200}
            alt={`${user.firstName[0]}${user.lastName[0]}`.toUpperCase()}
            label={`${user.firstName} ${user.lastName}`}
            labelStyle={{ fontSize: 16 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.centerAligned}>
            {user.contact}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.centerAligned}>
            {user.email}
          </Typography>
        </Grid>
      </Grid>
      <hr />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List
            style={{ width: "100%" }}
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                My Exhibitions
              </ListSubheader>
            }
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Summer BBQ"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      to Scott, Alex, Jennifer
                    </Typography>
                    {" — Wish I could come, but I'm out of town this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Oui Oui"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Sandra Adams
                    </Typography>
                    {" — Do you have Paris recommendations? Have you ever…"}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};

export { UserProfile };
