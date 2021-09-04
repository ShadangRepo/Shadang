import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  actionButton: {
    minWidth: "75px",
    marginLeft: "10px",
  },
});

const CustomDialog = ({
  classes,
  title,
  open,
  onClose,
  closeLabel,
  onOk,
  okLabel,
  children,
  customAction,
  maxWidth = "xs",
  closeDisabled = false,
  okDisabled = false,
  fieldsetDisabled = false,
  ...others
}) => {
  const [isOpen, setOpen] = useState(false);
  closeLabel = closeLabel || (onOk ? "Cancel" : "Close");
  okLabel = okLabel || "Save";
  useEffect(() => {
    setOpen(open);
  }, [open]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  if (customAction && !Array.isArray(customAction))
    customAction = [customAction];
  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={onClose}
      disableEscapeKeyDown
      fullWidth={true}
      maxWidth={maxWidth}
      {...others}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <fieldset disabled={fieldsetDisabled}>{children}</fieldset>
      </DialogContent>
      <DialogActions>
        {Array.isArray(customAction) &&
          customAction
            .filter((x) => !x.hide)
            .map(({ onClick, label, color, variant }) => (
              <Button
                key={label}
                onClick={onClick}
                color={color ?? "secondary"}
                className={classes.actionButton}
                disabled={closeDisabled}
                variant={variant}
              >
                {label}
              </Button>
            ))}
        {onClose && (
          <Button
            onClick={onClose}
            color="secondary"
            className={classes.actionButton}
            disabled={closeDisabled}
          >
            {closeLabel}
          </Button>
        )}
        {onOk && (
          <Button
            onClick={onOk}
            variant="contained"
            color="secondary"
            className={classes.actionButton}
            disabled={okDisabled}
          >
            {okLabel}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

const CustomDialogStyled = withStyles(styles)(CustomDialog);
export { CustomDialogStyled as CustomDialog };
