import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 100,
  },
  text404: {
    color: "#C0C0C0",
    fontWeight: "bolder",
    fontSize: "180px",
  },
  subTitle: {
    fontWeight: "bold",
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h1" className={classes.text404}>
          404
        </Typography>
        <Typography className={classes.subTitle}>Page not found</Typography>
      </Grid>
    </Grid>
  );
};

export { NotFound };
