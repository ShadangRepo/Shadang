import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { NotFound } from "../common/NotFound";
import { UserConfirmation } from "../common/UserConfirmation";
import { Login } from "../pages/authentication/Login";
import { Signup } from "../pages/authentication/Signup";
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
          <Route path="/" component={Application} />
        </Switch>
      </BrowserRouter>
    </ThemeWrapper>
  );
};

export default App;
