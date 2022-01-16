import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Popover } from "@material-ui/core";
import TableFilters from "./TableFilters";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  title: {
    flex: "1 1 100%",
  },
  noDataMessageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const CustomDataTable = (props) => {
  const {
    columns = [],
    rows = [],
    keyField,
    label,
    addLabel,
    actions,
    filters = [],
  } = props;

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filtersPopoverAnchor, setFiltersPopoverAnchor] = useState(null);
  const filtersPopoverOpen = Boolean(filtersPopoverAnchor);
  const [filteredData, setFilteredData] = useState([]);

  const [localFiltersSelected, setLocalFiltersSelected] = useState(() => {
    const defaultFilter = filters.find(({ defaultValue }) => defaultValue);
    if (defaultFilter) {
      const defaultValue = {
        [defaultFilter.fieldLabel]: defaultFilter.defaultValue,
      };
      return defaultValue;
    } else {
      return {};
    }
  });

  const [filtering, setFiltering] = useState(() => {
    const defaultFilter = filters.find(({ defaultValue }) => defaultValue);
    let initialFilters = {
      columns:
        filters &&
        filters.map((f) => {
          return { id: f.target };
        }),
    };

    if (defaultFilter) {
      initialFilters = {
        ...initialFilters,
        selectedFilters: [
          { ...defaultFilter, value: defaultFilter["defaultValue"] },
        ],
      };
    }

    return initialFilters;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFiltersPopover = (event) => {
    setFiltersPopoverAnchor(event.currentTarget);
  };
  const handleFiltersPopoverClose = () => {
    setFiltersPopoverAnchor(null);
  };

  const handleFiltering = (newFilter) => {
    if (newFilter.value === "All") {
      const items = filtering.selectedFilters.filter(
        (item) => item.fieldLabel !== newFilter.fieldLabel
      );
      setFiltering({
        columns:
          filters &&
          filters.map((f) => {
            return { id: f.target };
          }),
        selectedFilters: [...items],
      });
    } else {
      const { selectedFilters = [] } = filtering;
      const newFilters = selectedFilters.filter(
        (filter) => filter.fieldLabel !== newFilter.fieldLabel
      );
      const newItems = {
        ...filtering,
        selectedFilters: [...newFilters, newFilter],
      };
      setFiltering(newItems);
    }
  };

  const setFilterValues = (event, filter) => {
    handleFiltering({
      value: event.target.value,
      target: filter.filter.target,
      fieldLabel: filter.filter.fieldLabel,
    });

    const newSelectedValue = {
      ...localFiltersSelected,
      [filter.filter.fieldLabel]: event.target.value,
    };
    setLocalFiltersSelected(newSelectedValue);
  };

  const filterRecords = () => {
    let data = rows;
    if (
      filtering &&
      filtering.selectedFilters &&
      filtering.selectedFilters.length > 0
    ) {
      filtering.selectedFilters.forEach((filter) => {
        data = data.filter((r) => r[filter.target] === filter.value);
      });
    }
    setFilteredData(data);
  };

  useEffect(() => {
    filterRecords();
  }, [filtering, rows]);

  return (
    <Paper className={classes.root}>
      <Toolbar>
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {label}
        </Typography>
        {filters && filters.length > 0 && (
          <>
            <Tooltip title="Filters">
              <IconButton
                aria-owns={filtersPopoverOpen ? "filter-popover-id" : undefined}
                aria-describedby="Filters"
                onClick={handleFiltersPopover}
              >
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            <Popover
              id={"filter-popover-id"}
              open={filtersPopoverOpen}
              anchorEl={filtersPopoverAnchor}
              onClose={handleFiltersPopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <TableFilters
                filters={filters}
                handleFiltersPopoverClose={handleFiltersPopoverClose}
                localFiltersSelected={localFiltersSelected}
                setFilterValues={setFilterValues}
              />
            </Popover>
          </>
        )}
        {actions && actions.onAdd && (
          <Tooltip title={addLabel || "Add"}>
            <IconButton onClick={() => actions.onAdd()}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, i) => (
                <TableCell
                  key={`header-${column.id}-${i}`}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              {actions && actions.onEdit && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row[keyField]}
                  >
                    {columns.map((column, columnIndex) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={`cell-${rowIndex}-${columnIndex}`}
                          align={column.align}
                        >
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                    {actions && actions.onEdit && (
                      <TableCell key="actions">
                        <Tooltip title={"Edit"}>
                          <IconButton
                            onClick={() => actions.onEdit(row[keyField])}
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export { CustomDataTable };
