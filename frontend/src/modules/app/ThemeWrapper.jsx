import React, { createRef, useEffect, useState } from "react";
import { AppContext } from "../common/AppContext";
import LoadingBar from "react-top-loading-bar";
import {
  Notifications,
  NotificationStatus,
  useNotifications,
} from "../common/Notifications";
import { useMediaQuery, useTheme, withStyles } from "@material-ui/core";
import { getToken } from "../shared/tokenConfig";
import { proxyClient } from "../shared/proxy-client";

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
  const [loader, setLoader] = useState();
  const [loadingUserDetails, setLoadingUserDetails] = useState(true);

  useEffect(() => {
    const { current: loadingBar } = loadingBarRef;
    if (!loadingBar) return;
    setLoader(loadingBar);
    const { continuousStart, complete } = loadingBar;
    proxyClient.configure({
      startCallback: continuousStart,
      endCallback: () => {
        const { state: { progress = 0 } = {} } = loadingBar;
        if (progress) complete();
      },
    });
  }, []);

  const getUserDetailsFromApi = async () => {
    try {
      let query = await proxyClient.get("/auth/getUserDetails");
      const response = query.response;
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        queueNotification({
          status: NotificationStatus.Error,
          message: response.message,
        });
      }
    } catch (err) {
      queueNotification(err);
    }
  };

  useEffect(() => {
    //if token exist, get user details from api and store them to context
    const token = getToken();
    if (token) {
      getUserDetailsFromApi().then(() => {
        setLoadingUserDetails(false);
      });
    } else {
      setLoadingUserDetails(false);
    }
  }, []);

  return (
    <>
      {!loadingUserDetails ? (
        <div className={classes.root}>
          <AppContext.Provider
            value={{
              user,
              setUser,
              notifications,
              queueNotification,
              isMobile,
              loadingBar: loader,
              getUserDetailsFromApi,
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
