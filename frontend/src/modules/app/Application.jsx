import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { NotFound } from "../common/NotFound";
import { UserProfile } from "../pages/authentication/UserProfile";
import { Catalog } from "../pages/catalog/Catalog";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { AppLayout } from "./AppLayout";
import { ProtectedRoute } from "../common/ProtectedRoute";
import { MyExhibitions } from "../pages/myExhibitions/MyExhibitions";
import { EditProfile } from "../pages/authentication/EditProfile";

const Application = () => {
  return (
    <AppLayout>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Redirect to={"/catalog"} />}
        />
        <ProtectedRoute path="/catalog" component={Catalog} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/user-profile/edit" component={EditProfile} />
        <ProtectedRoute path="/user-profile" component={UserProfile} />
        <ProtectedRoute path="/my-exhibitions" component={MyExhibitions} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
};

export { Application };
