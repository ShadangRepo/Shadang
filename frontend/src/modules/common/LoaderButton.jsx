import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  loadingButton: {
    backgroundColor: "#0000ff",
  },
  loader: {
    color: "#fff",
  },
}));

const LoaderButton = (props) => {
  const { loading, onClick, children, fullWidth, disabled } = props;
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      className={classes.loadingButton}
      fullWidth={fullWidth}
      disabled={disabled || loading}
    >
      {loading ? (
        <CircularProgress className={classes.loader} size={25} />
      ) : (
        children
      )}
    </Button>
  );
};

export { LoaderButton };
