import React from "react";
import ReactDOM from "react-dom";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const Actions = ({ closeModal }) => {
  const useStyles = makeStyles(() => ({
    cancelButton: {
      color: "#677C89",
      fontWeight: "bold",
    },
    confirmButton: {
      backgroundColor: "#677C89",
      color: "#fff",
    },
  }));
  const classes = useStyles();
  return (
    <>
      <Button
        onClick={() => closeModal(false)}
        className={classes.cancelButton}
      >
        Cancel
      </Button>
      <Button
        onClick={() => closeModal(true)}
        variant="contained"
        className={classes.confirmButton}
      >
        Confirm
      </Button>
    </>
  );
};

const UserConfirmation = (message, callback) => {
  const classes = {
    dialogText: {
      color: "#000",
    },
  };
  const container = document.createElement("div");
  container.setAttribute("custom-confirmation-navigation", "");
  document.body.appendChild(container);
  const closeModal = (callbackState) => {
    ReactDOM.unmountComponentAtNode(container);
    callback(callbackState);
  };
  ReactDOM.render(
    <Dialog
      open={true}
      onClose={() => closeModal(false)}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText style={classes.dialogText}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Actions closeModal={closeModal} />
      </DialogActions>
    </Dialog>,
    container
  );
};
export { UserConfirmation };
