import { FormControlLabel, Grid, MenuItem, Switch, TextField, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router";
import { FormPage } from "../../common/FormPage";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { UploadHandler } from "../../common/UploadHandler";
import {
  NotificationStatus,
  StandardMessageTypes,
} from "../../common/Notifications";
import { AppContext } from "../../common/AppContext";
import { proxyClient } from "../../shared/proxy-client";
import { useGlobalStyles } from "../../shared/globalStyles";
import { ExhibitionCategories } from "../../shared/constants";
import { getRefreshTokenFromLocalStorage } from "../../preferences/userPreferences";

const ExhibitionDetails = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const { queueNotification } = useContext(AppContext);
  const { exhibitionId = "0" } = useParams();
  const [saveStatus, setSaveStatus] = useState({
    isSaving: false,
    hasSaved: false,
  });
  const [errors, setErrors] = useState({});
  const [exhibitionDetails, setExhibitionDetails] = useState({});
  const globalClasses = useGlobalStyles();

  ["title", "description", "category"].forEach(
    (key) => (exhibitionDetails[key] = exhibitionDetails[key] || "")
  );

  ["isGroupExhibition"].forEach(
    (key) => (exhibitionDetails[key] = exhibitionDetails[key] || false)
  );

  const updateFields = (newValues) => {
    const newFormData = { ...exhibitionDetails, ...newValues };
    setExhibitionDetails(newFormData);
    if (saveStatus.hasSaved) updateInvalidFields(newFormData);
  };

  const onImagesChange = (urlList) => {
    updateFields({ images: urlList });
  };

  const updateInvalidFields = (newData) => {
    const newErrors = {};
    if (!newData.title) newErrors.title = "Title is required";
    if (!newData.category) newErrors.category = "Category is required";
    if (!newData.startDate) newErrors.startDate = "Start date is required";
    if (!newData.endDate) newErrors.endDate = "End date is required";

    const isInvalid = Object.keys(newErrors).length > 0;
    setErrors(newErrors);
    return isInvalid;
  };

  const handleSaveExhibition = async () => {
    if (updateInvalidFields(exhibitionDetails)) {
      queueNotification(StandardMessageTypes.ValidationErrors);
      setSaveStatus({ hasSaved: true, isSaving: false });
      return;
    }

    setSaveStatus({ hasSaved: true, isSaving: true });
    let payload = {
      ...exhibitionDetails,
      startDate: new Date(exhibitionDetails.startDate).getTime(),
      endDate: new Date(exhibitionDetails.endDate).getTime(),
    };

    try {
      let query;
      if (`${exhibitionId}` === "0") {
        query = await proxyClient.post("/exhibitions/create", payload);
      } else {
        query = await proxyClient.put("/exhibitions/update", payload);
      }

      const response = query.response;
      setSaveStatus({ hasSaved: true, isSaving: false });
      if (response.success) {
        queueNotification({
          status: NotificationStatus.Success,
          message: response.message,
        });

        history.push(`${path.split("/").slice(0, -1).join("/")}`);
      } else {
        queueNotification({
          status: NotificationStatus.Error,
          message: response.message,
        });
      }
    } catch (err) {
      queueNotification(err);
      setSaveStatus({ hasSaved: true, isSaving: false });
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} md={12} className={globalClasses.justifyContentCenter}>
        <FormPage
          onSave={handleSaveExhibition}
          onCancel={() => history.push(`${path.split("/").slice(0, -1).join("/")}`)}
          blocked={saveStatus.isSaving}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">{`${exhibitionId}` === "0" ? "Create New Exhibition" : "Exhibition details"}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                error={!!errors.title}
                helperText={errors.title}
                id="title"
                label="Title"
                variant="outlined"
                value={exhibitionDetails.title}
                onChange={(event) => updateFields({ title: event.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                select
                error={!!errors.category}
                helperText={errors.category}
                id="category"
                label="Category"
                variant="outlined"
                value={exhibitionDetails.category}
                onChange={(event) => updateFields({ category: event.target.value })}
              >
                <MenuItem key={"-1"} value={""}>Select</MenuItem>
                {ExhibitionCategories.map(({ label, Icon }) => (
                  <MenuItem key={label} value={label}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  required
                  autoOk
                  fullWidth
                  format="DD/MM/YYYY"
                  id="startDate"
                  label="Start Date"
                  value={exhibitionDetails.startDate || null}
                  onChange={(date) => updateFields({ startDate: new Date(date) })}
                  error={!!errors.startDate}
                  helperText={errors.startDate}
                  variant="inline"
                  inputVariant="outlined"
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  required
                  autoOk
                  fullWidth
                  format="DD/MM/YYYY"
                  id="endDate"
                  label="End Date"
                  value={exhibitionDetails.endDate || null}
                  onChange={(date) => updateFields({ endDate: new Date(date) })}
                  error={!!errors.endDate}
                  helperText={errors.endDate}
                  variant="inline"
                  inputVariant="outlined"
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel control={
                <Switch
                  id="isGroupExhibition"
                  color="primary"
                  checked={exhibitionDetails.isGroupExhibition}
                  onChange={(event) => updateFields({ isGroupExhibition: event.target.checked })}
                />}
                label="Is Group Exhibition?" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={5}
                id="description"
                label="Description"
                inputProps={{ maxLength: 1000 }}
                variant="outlined"
                value={exhibitionDetails.description}
                onChange={(event) =>
                  updateFields({ description: event.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <UploadHandler
                multiple={true}
                accept="image/*"
                onChange={(urlList) => onImagesChange(urlList)}
              />
            </Grid>
          </Grid>
        </FormPage>
      </Grid>
    </Grid>
  );
};

export { ExhibitionDetails };
