import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { CustomDataTable } from "../../common/CustomDataTable";

const ExhibitionList = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const history = useHistory();
  const { path } = useRouteMatch();
  const columns = [
    { id: "name", label: "Name" },
    { id: "startDate", label: "Start Date" },
    { id: "endDate", label: "End Date" },
  ];

  const goToAddEdit = (id) => {
    history.push(`${path}/${id || 0}`);
  };

  let actions = {};
  actions.onAdd = goToAddEdit;
  actions.onEdit = goToAddEdit;

  return (
    <CustomDataTable
      keyField="name"
      columns={columns}
      rows={exhibitions}
      label="Exhibitions"
      actions={actions}
    />
  );
};

export { ExhibitionList };
