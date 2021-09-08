import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { AppContext } from "../../common/AppContext";
import { CustomDataTable } from "../../common/CustomDataTable";
import { NotificationStatus } from "../../common/Notifications";
import { proxyClient } from "../../shared/proxy-client";

const ExhibitionList = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const { queueNotification } = useContext(AppContext);
  const history = useHistory();
  const { path } = useRouteMatch();
  const columns = [
    { id: "title", label: "Name" },
    { id: "startDate", label: "Start Date" },
    { id: "endDate", label: "End Date" },
  ];

  const getExhibitions = async () => {
    try {
      const query = await proxyClient.get("/exhibitions/myExhibitions");
      const response = query.response;
      if (response.success) {
        let formattedResponse = response.data.map((item) => ({
          ...item,
          startDate: moment(item.startDate).format("DD/MM/YYYY"),
          endDate: moment(item.endDate).format("DD/MM/YYYY"),
        }));
        setExhibitions(formattedResponse);
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
    getExhibitions();
  }, []);

  const goToAddEdit = (id) => {
    history.push(`${path}/${id || 0}`);
  };

  let actions = {};
  actions.onAdd = goToAddEdit;
  actions.onEdit = goToAddEdit;

  return (
    <CustomDataTable
      keyField="id"
      columns={columns}
      rows={exhibitions}
      label="Exhibitions"
      actions={actions}
    />
  );
};

export { ExhibitionList };
