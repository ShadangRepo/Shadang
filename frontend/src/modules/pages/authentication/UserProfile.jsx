import { Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { AppContext } from "../../common/AppContext";
import { CircleAvatar } from "../../common/CircleAvatar";
import { useAuthenticationStyles } from "./authenticationStyles";

const UserProfile = () => {
  const classes = useAuthenticationStyles();
  const { user } = useContext(AppContext);

  return (
    <>
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
    </>
  );
};

export { UserProfile };
