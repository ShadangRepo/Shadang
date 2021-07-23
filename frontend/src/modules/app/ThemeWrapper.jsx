import React, { createRef, useEffect, useState } from "react";
import { AppContext } from "../common/AppContext";
import LoadingBar from "react-top-loading-bar";
import { Notifications, useNotifications } from "../common/Notifications";
import { useMediaQuery, useTheme, withStyles } from "@material-ui/core";
import { getToken } from "../shared/tokenConfig";

const styles = {
  root: {
    width: "100%",
    minHeight: "100%",
    marginTop: 0,
    zIndex: 1,
  },
  loadingBar: {
    height: "3px",
  },
};

const ThemeWrapper = ({ classes, children }) => {
  const [user, setUser] = useState(null);
  const { notifications, queueNotification } = useNotifications();
  let loadingBarRef = createRef();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    let token = getToken();
    if (token) {
      //get user details for token;
      setUser({});
    } else {
      setUser({});
    }
  }, []);

  return (
    <>
      {user ? (
        <div className={classes.root}>
          <AppContext.Provider
            value={{
              user,
              setUser,
              notifications,
              queueNotification,
              isMobile,
            }}
          >
            <>
              <LoadingBar
                height={0}
                color="#01579B"
                ref={loadingBarRef}
                className={classes.loadingBar}
              />
              {children}
              <Notifications />
            </>
          </AppContext.Provider>
        </div>
      ) : (
        <img
          src="/images/spinner.gif"
          className="preloader-init"
          alt="spinner"
        />
      )}
    </>
  );
};

export default withStyles(styles)(ThemeWrapper);
