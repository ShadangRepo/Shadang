import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { NotFound } from "../common/NotFound";
import { ProtectedRoute } from "../common/ProtectedRoute";
import { UserConfirmation } from "../common/UserConfirmation";
import { Login } from "../pages/authentication/Login";
import { Signup } from "../pages/authentication/Signup";
import { ViewExhibition } from "../pages/exhibitions/ViewExhibition";
import { getUrlParameter } from "../shared/query-string";
import { getToken } from "../shared/tokenConfig";
import { Application } from "./Application";
import ThemeWrapper from "./ThemeWrapper";

const App = () => {
  const redirect = getUrlParameter("redirect") || "";
  return (
    <ThemeWrapper>
      <BrowserRouter
        getUserConfirmation={(message, callback) =>
          UserConfirmation(message, callback)
        }
      >
        <Switch>
          <Route
            path="/login"
            render={(props) =>
              getToken() ? (
                <Redirect to={`${redirect || "/"}`} />
              ) : (
                <Login {...props} />
              )
            }
          />
          <Route path="/signup" component={Signup} />
          <Route path="/notfound" component={NotFound} />
          <ProtectedRoute
            path="/viewExhibition/:exhibitionId?"
            component={ViewExhibition}
          />
          <Route path="/" component={Application} />
        </Switch>
      </BrowserRouter>
    </ThemeWrapper>
  );
};

export default App;
