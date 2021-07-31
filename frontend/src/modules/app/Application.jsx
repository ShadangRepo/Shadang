import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { NotFound } from "../common/NotFound";
import { Catalog } from "../pages/catalog/Catalog";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { AppLayout } from "./AppLayout";
// import { ProtectedRoute } from "../common/ProtectedRoute";

const Application = () => {
  return (
    <AppLayout>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Redirect to={"/catalog"} />}
        />
        <Route path="/catalog" component={Catalog} />
        <Route path="/dashboard" component={Dashboard} />
        {/* <ProtectedRoute path="/" component={Application} /> */}
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
};

export { Application };
