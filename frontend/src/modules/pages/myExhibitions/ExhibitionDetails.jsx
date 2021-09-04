import { Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { FormPage } from "../../common/FormPage";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";

const ExhibitionDetails = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const [saveStatus, setSaveStatus] = useState({
    isSaving: false,
    hasSaved: false,
  });
  const [errors, setErrors] = useState({});
  const [exhibitionDetails, setExhibitionDetails] = useState({});

  const updateFields = (newValues) => {
    setExhibitionDetails((prev) => {
      const newData = { ...prev, ...newValues };
      return newData;
    });
  };

  const handleSaveExhibition = () => {};
  return (
    <FormPage
      onSave={handleSaveExhibition}
      onCancel={() => history.push(`${path.split("/").slice(0, -1).join("/")}`)}
      blocked={saveStatus.isSaving}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
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
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              required
              autoOk
              fullWidth
              format="DD/MM/YYYY"
              id="startDate"
              label="Start Date"
              value={exhibitionDetails.startDate || null}
              onChange={(date) => updateFields({ startDate: date })}
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
              onChange={(date) => updateFields({ endDate: date })}
              error={!!errors.endDate}
              helperText={errors.endDate}
              variant="inline"
              inputVariant="outlined"
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={5}
            id="descrition"
            label="Description"
            inputProps={{ maxLength: 1000 }}
            variant="outlined"
            value={exhibitionDetails.descrition}
            onChange={(event) =>
              updateFields({ descrition: event.target.value })
            }
          />
        </Grid>
      </Grid>
    </FormPage>
  );
};

export { ExhibitionDetails };
