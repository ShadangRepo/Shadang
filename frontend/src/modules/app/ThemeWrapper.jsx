import React, { createRef, useEffect, useState } from "react";
import { AppContext } from "../common/AppContext";
import LoadingBar from "react-top-loading-bar";
import { Notifications, useNotifications } from "../common/Notifications";
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

  return (
    <div className={classes.root}>
      <AppContext.Provider
        value={{
          user,
          setUser,
          notifications,
          queueNotification,
          isMobile,
          loadingBar: loader,
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
  );
};

export default withStyles(styles)(ThemeWrapper);
