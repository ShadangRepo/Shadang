import React, { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { BrandName } from "../../shared/constants";
import { Helmet } from "react-helmet";
import { ExhibitionList } from "./ExhibitionList";
import { ExhibitionDetails } from "./ExhibitionDetails";

const MyExhibitions = () => {
  const title = `${BrandName} - My Exhibitions`;
  const { path: baseUrl } = useRouteMatch();
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Switch>
        <Route exact path={baseUrl} component={ExhibitionList} />
        <Route
          path={`${baseUrl}/:exhibitionId`}
          component={ExhibitionDetails}
        />
      </Switch>
    </div>
  );
};

export { MyExhibitions };
