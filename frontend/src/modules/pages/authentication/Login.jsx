import React, { useContext, useState } from "react";
import {
  Grid,
  TextField,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import { LoaderButton } from "../../common/LoaderButton";
import {
  NotificationStatus,
  StandardMessageTypes,
} from "../../common/Notifications";
import { AppContext } from "../../common/AppContext";
import { emailValidator } from "../../shared/fieldValidators";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useStyles } from "./styles";
import { useGlobalStyles } from "../../shared/globalStyles";
import { useHistory } from "react-router-dom";
import { proxyClient } from "../../shared/proxy-client";

const Login = () => {
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [saveStatus, setSaveStatus] = useState({
    isSaving: false,
    hasSaved: false,
  });
  const [emailValid, setEmailValid] = useState(false);
  const { queueNotification } = useContext(AppContext);
  const [passwordVisibility, setPasseordVisibility] = useState(false);
  const history = useHistory();

  ["email", "password"].forEach((key) => (formData[key] = formData[key] || ""));

  const updateInvalidFields = (newData) => {
    const newErrors = {};
    if (!newData.email) newErrors.email = "Email is required";
    if (newData.email && emailValidator(newData.email))
      newErrors.email = "Please enter valid email address";
    if (emailValid && !newData.password)
      newErrors.password = "Password is required";

    const isInvalid = Object.keys(newErrors).length > 0;
    setErrors(newErrors);
    return isInvalid;
  };

  const updateFields = (newValues) => {
    const newFormData = { ...formData, ...newValues };
    setFormData(newFormData);
    if (saveStatus.hasSaved) updateInvalidFields(newFormData);
  };

  const handleSubmit = async () => {
    if (updateInvalidFields(formData)) {
      queueNotification(StandardMessageTypes.ValidationErrors);
      setSaveStatus({ hasSaved: true, isSaving: false });
      return;
    }

    setSaveStatus({ hasSaved: true, isSaving: true });
    if (!emailValid) {
      setTimeout(() => {
        setSaveStatus({ hasSaved: true, isSaving: false });
        setEmailValid(true);
      }, 500);
    } else {
      let payload = {
        email: formData.email,
        password: formData.password,
      };
      try {
        let query = await proxyClient.post("/auth/login", payload, {
          noAuth: true,
        });
        const response = query.response;
        setSaveStatus({ hasSaved: true, isSaving: false });
        if (response.success) {
          queueNotification({
            status: NotificationStatus.Success,
            message: "Login successful",
          });
          history.push("/");
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
    }
  };

  const navigateSignup = () => {
    history.push("/signup");
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.iconContainer}>
            <img
              src="/images/logo_temp.png"
              alt="logo"
              className={classes.circleIcon}
            />
          </Grid>
          <Grid item xs={12} className={globalClasses.marginTop30}>
            <TextField
              name="email"
              label="Email"
              required
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={(event) => updateFields({ email: event.target.value })}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid
            item
            xs={12}
            className={`${classes.hiddenPassword} ${
              emailValid ? classes.showPasswordField : ""
            }`}
          >
            <TextField
              name="password"
              label="Password"
              required
              fullWidth
              type={passwordVisibility ? "text" : "password"}
              InputProps={{
                endAdornment: passwordVisibility ? (
                  <VisibilityOffIcon
                    onClick={() => setPasseordVisibility(false)}
                    className={classes.passwordToggle}
                  />
                ) : (
                  <VisibilityIcon
                    onClick={() => setPasseordVisibility(true)}
                    className={classes.passwordToggle}
                  />
                ),
              }}
              variant="outlined"
              value={formData.password}
              onChange={(event) =>
                updateFields({ password: event.target.value })
              }
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>
          <Grid
            item
            xs={12}
            className={`${classes.rowReverse} ${classes.btnContainer}`}
          >
            <LoaderButton loading={saveStatus.isSaving} onClick={handleSubmit}>
              {emailValid ? "Login" : "Next"}
            </LoaderButton>
          </Grid>
          <Grid
            item
            xs={12}
            className={`${classes.centerAligned} ${globalClasses.marginTop30}`}
          >
            <Typography className={globalClasses.link}>
              Forgot password?
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            className={`${classes.centerAligned} ${globalClasses.marginTop20}`}
          >
            <Typography>New to Shadang?</Typography>
            <Typography className={globalClasses.link} onClick={navigateSignup}>
              Signup
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export { Login };
