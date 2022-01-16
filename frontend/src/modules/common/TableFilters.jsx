import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import {
  FormControl,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  Paper,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const TableFilters = ({
  filters,
  handleFiltersPopoverClose,
  localFiltersSelected,
  setFilterValues,
}) => {
  const useStyles = makeStyles(() => ({
    formControl: {
      margin: "0 10px 10px 0",
      width: "90%",
    },
    filterLabel: {
      paddingTop: 10,
    },
    rangeFilter: {
      width: "100%",
      "& input": {
        fontSize: 12,
        padding: 12,
      },
    },
    paper: {
      maxWidth: 750,
      minWidth: 500,
      padding: 10,
    },
    container: {
      borderBottom: "1px solid #ccc",
      paddingBottom: 10,
      marginBottom: 20,
    },
    filterOption: {
      margin: 20,
    },
  }));
  const localClasses = useStyles();

  return (
    <Paper className={localClasses.paper}>
      <Grid container className={localClasses.container}>
        <Grid item xs={12} md={8}>
          <Typography
            variant="h6"
            component="h5"
            className={localClasses.typography}
          >
            Filters
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} style={{ textAlign: "right" }}>
          <Tooltip title="Close filters">
            <IconButton
              aria-label="Close filters"
              onClick={handleFiltersPopoverClose}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container>
        {filters.map((filter) => {
          return (
            <Grid item xs={12} md={6} key={filter.fieldLabel}>
              <FormControl className={localClasses.formControl}>
                <TextField
                  fullWidth
                  select
                  label={filter.fieldLabel}
                  variant="outlined"
                  value={localFiltersSelected[filter.fieldLabel] || "All"}
                  onChange={(event) => setFilterValues(event, { filter })}
                >
                  <MenuItem key={"-1"} value={"All"}>
                    All
                  </MenuItem>
                  {filter.data &&
                    filter.data.map((option) => (
                      <MenuItem
                        key={option[filter.value]}
                        value={option[filter.value]}
                      >
                        {option[filter.label]}
                      </MenuItem>
                    ))}
                </TextField>
              </FormControl>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default TableFilters;
