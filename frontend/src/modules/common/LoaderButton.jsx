import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
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
