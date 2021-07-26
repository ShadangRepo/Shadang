import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { NotFound } from "../common/NotFound";
import { Dashboard } from "../pages/dashboard/Dashboard";

const Application = () => {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Redirect to={"/category"} />} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
};

export { Application };
