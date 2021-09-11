import React, { useState, useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Portal from "@material-ui/core/Portal";
import { AppContext } from "./AppContext";
import { clearTokenFromLocalStorage } from "../preferences/userPreferences";

const styles = (theme) => ({
  actionDefault: {
    position: "absolute",
    padding: "0",
    margin: "0",
    right: "10px",
    "& button": {
      padding: "5px",
      "& svg": {
        width: "0.6em",
        height: "0.6em",
      },
    },
  },
  snackbarDefault: {
    zIndex: 1310,
  },
  bgSuccess: {
    background: "#228b22",
  },
  bgError: {
    background: "#f00",
  },
  bgDefault: {
    background: "#3B3B3B",
  },
});

const NotificationStatus = Object.freeze({
  Info: 0,
  Success: 1,
  Error: 2,
});

const StandardMessageTypes = Object.freeze({
  GenericError: 0,
  ValidationErrors: 1,
});

// Commons messages reused across different screens, this array should not contain more than 5
const StandardMessages = Object.freeze([
  {
    status: NotificationStatus.Error,
    message: "The application has encountered an unknown error",
  },
  { status: NotificationStatus.Error, message: "Some fields are incorrect" },
]);

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const removeNotification = (notification) => {
    setNotifications([]);
  };
  const queueNotification = (notification) => {
    if (!notification) return;
    else if (typeof notification !== "object")
      notification = StandardMessages[notification] || {};
    else if (notification.status === true)
      notification.status = NotificationStatus.Success;
    else if (notification.status === false)
      notification.status = NotificationStatus.Error;
    else if (notification.uri && notification.status >= 100) {
      if (notification.message && typeof notification.message === "object")
        notification = notification.message;
      else if (notification.status >= 500 || notification.status === 404)
        notification = StandardMessages[StandardMessageTypes.GenericError];
    }

    const { message = "" } = notification || {};
    if (!message) return;
    notification.id = "_" + Math.random().toString(36).substr(2, 9);
    notification.onClose = () => removeNotification(notification);
    const newNotifications = [notification];
    setNotifications(newNotifications);
  };
  return { notifications, queueNotification };
};

const Notifications = ({ classes }) => {
  const { notifications } = useContext(AppContext);
  return (
    <Portal>
      {notifications.map(({ id, onClose, message, status }) => (
        <Snackbar
          key={id}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={true}
          onClose={onClose}
          onClick={onClose}
          autoHideDuration={status === NotificationStatus.Error ? 2000 : 3000}
          style={{ cursor: "pointer" }}
          classes={{
            root: classes.snackbarDefault,
          }}
          ContentProps={{
            "aria-describedby": `message-id-${id}`,
            classes: {
              root:
                status === NotificationStatus.Success
                  ? classes.bgSuccess
                  : status === NotificationStatus.Error
                  ? classes.bgError
                  : classes.bgDefault,
              action: classes.actionDefault,
            },
            action: [
              <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                onClick={onClose}
              >
                <CloseIcon />
              </IconButton>,
            ],
          }}
          ClickAwayListenerProps={{
            mouseEvent: false,
            touchEvent: false,
          }}
          message={<span id={`message-id-${id}`}>{message}</span>}
        />
      ))}
    </Portal>
  );
};

const NotificationsWithStyles = withStyles(styles)(Notifications);

export {
  NotificationsWithStyles as Notifications,
  useNotifications,
  NotificationStatus,
  StandardMessageTypes,
};
