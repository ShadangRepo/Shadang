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
  const [blurScreen, setBlurScreen] = useState(false);

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

  // useEffect(() => {
  //  //Image security handlers goes here
  //   window.addEventListener("keydown", (event) => {
  //     if (event.key === "Meta" || event.key === "Alt") {
  //       navigator.clipboard.writeText("");
  //       setBlurScreen(true);
  //     }
  //   });
  //   window.addEventListener("keyup", (event) => {
  //     if (event.key === "Meta" || event.key === "Alt") {
  //       setBlurScreen(false);
  //     }
  //   });
  //   window.addEventListener("focus", (event) => {
  //     setBlurScreen(false);
  //   });
  //   window.addEventListener("blur", () => {
  //     setBlurScreen(true);
  //   });
  //   //Disable rigntclick on window to prevent save image
  //   window.oncontextmenu = () => false;
  // }, []);

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
    <div style={{ opacity: blurScreen ? 0.2 : 1 }}>
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
    </div>
  );
};

export default withStyles(styles)(ThemeWrapper);
