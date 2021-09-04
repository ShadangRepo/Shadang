import React, { useState, forwardRef, useImperativeHandle } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Prompt,
} from "react-router-dom";
import { Tooltip } from "@material-ui/core";

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  actionBar: {
    width: "100%",
    textAlign: "right",
    marginTop: "25px",
  },
  actionBarTop: {
    marginTop: "0",
    marginBottom: "5px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "25px",
    },
  },
  actionButton: {
    minWidth: "85px",
    height: "38px",
  },
  formContainer: {
    maxWidth: "960px",
  },
  sectionTitle: {
    margin: "30px 0 10px 0",
  },
  datePicker: {
    "& label": {
      top: -10,
    },
    "& div": {
      marginTop: 0,
    },
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ddd",
    position: "relative",
    border: "1px dashed #989898",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& button": {
      position: "absolute",
      top: 3,
      right: 3,
    },
  },
  validationError: {
    color: "#f44336",
  },
  errorMessage: {
    color: "#f44336",
    margin: "8px 14px 0",
    fontSize: "0.75rem",
    fontWeight: "400",
    lineHeight: "1em",
    paddingLeft: "5px",
    minHeight: "1em",
  },
  buttonList: {
    boxShadow:
      "0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
    borderRadius: "4px",
  },
  ddButton: {
    minWidth: "85px",
    borderColor: "#bdbdbd!important",
  },
});

const DropDownButton = ({ classes, blocked, options }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const mainAction = options[0];
  return (
    <>
      <ButtonGroup
        variant="contained"
        color="secondary"
        ref={anchorRef}
        aria-label="split button"
        disabled={blocked}
        style={{ boxShadow: "none" }}
      >
        <Button
          className={classes.ddButton}
          onClick={() => {
            mainAction.onClick();
          }}
        >
          {mainAction.label}
        </Button>

        <Button
          size="small"
          aria-owns={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper id="menu-list-grow" className={classes.buttonList}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {options.map(
                    (action, i) =>
                      i > 0 && (
                        <MenuItem
                          style={{
                            textTransform: "uppercase",
                            fontSize: "0.875rem",
                          }}
                          key={i}
                          selected={false}
                          onClick={() => {
                            action.onClick();
                            setOpen(false);
                          }}
                        >
                          {action.label}
                        </MenuItem>
                      )
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

const ActionBar = ({
  classes,
  onSave,
  saveLabel,
  onSaveAndClose,
  onCancel,
  cancelLabel,
  blocked,
  setDirty,
  customActions,
  saveDisabled,
}) => {
  const handleSaveAndClose = () => {
    setDirty(false);
    onSaveAndClose();
  };

  return (
    <Grid container justifyContent="flex-end" direction="row" spacing={1}>
      {onCancel && (
        <Grid item xs={"auto"}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.actionButton}
            onClick={onCancel}
          >
            {cancelLabel ? cancelLabel : "Cancel"}
          </Button>
        </Grid>
      )}
      {customActions &&
        customActions.map((action, i) => (
          <Grid key={i} item xs={"auto"}>
            {action.length && action.length > 1 ? (
              <DropDownButton
                classes={classes}
                setDirty={setDirty}
                blocked={blocked}
                options={action}
              />
            ) : (
              <>
                {action.toolTip ? (
                  <Tooltip title={action.toolTip}>
                    <span>
                      <Button
                        variant="contained"
                        onClick={action.onClick}
                        color="secondary"
                        className={classes.actionButton}
                        disabled={
                          typeof action.blocked === "boolean"
                            ? action.blocked
                            : blocked
                        }
                      >
                        {action.label}
                      </Button>
                    </span>
                  </Tooltip>
                ) : (
                  <Button
                    variant="contained"
                    onClick={action.onClick}
                    color="secondary"
                    className={classes.actionButton}
                    disabled={
                      typeof action.blocked === "boolean"
                        ? action.blocked
                        : blocked
                    }
                  >
                    {action.label}
                  </Button>
                )}
              </>
            )}
          </Grid>
        ))}
      {onSave && !onSaveAndClose && (
        <Grid item xs={"auto"}>
          <Button
            variant="contained"
            onClick={() => {
              setDirty(false);
              onSave();
            }}
            color="primary"
            className={classes.actionButton}
            disabled={blocked || saveDisabled}
          >
            {saveLabel ? saveLabel : "Save"}
          </Button>
        </Grid>
      )}
      {onSaveAndClose && (
        <Grid item xs={"auto"}>
          <DropDownButton
            classes={classes}
            blocked={blocked || saveDisabled}
            options={[
              {
                label: "Save",
                onClick: () => {
                  setDirty(false);
                  onSave();
                },
              },
              {
                label: "Save and Close",
                onClick: handleSaveAndClose,
              },
            ]}
          />
        </Grid>
      )}
    </Grid>
  );
};

const FormPage = forwardRef(
  (
    {
      children,
      classes,
      onSave,
      saveLabel,
      onSaveAndClose,
      onCancel,
      cancelLabel,
      blocked,
      customActions,
      saveDisabled = false,
    },
    ref
  ) => {
    const [isDirty, setDirty] = useState(false);

    useImperativeHandle(ref, () => {
      return {
        setFormDirty: setDirty,
      };
    });

    return (
      <Paper className={classes.paper}>
        <form
          onChange={(evt) => {
            setDirty(true);
          }}
        >
          <fieldset
            disabled={blocked}
            style={{
              minInlineSize: "auto",
              maxWidth: "100%",
              minWidth: "100%",
              width: "100%",
              border: "none",
            }}
          >
            {children}
          </fieldset>
          <div className={classes.actionBar}>
            <ActionBar
              classes={classes}
              onSave={onSave}
              saveLabel={saveLabel}
              onSaveAndClose={onSaveAndClose}
              onCancel={onCancel}
              cancelLabel={cancelLabel}
              blocked={blocked}
              setDirty={setDirty}
              customActions={customActions}
              saveDisabled={saveDisabled}
            />
          </div>
        </form>
        <Prompt
          when={isDirty}
          message="You have started writing/editing changes. Are you sure you want to leave this page?"
        />
      </Paper>
    );
  }
);

const FormPageWithStyles = withStyles(styles)(FormPage);
export { styles as formStyles, FormPageWithStyles as FormPage };
