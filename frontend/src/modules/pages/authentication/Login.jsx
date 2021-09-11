import React, { useContext, useEffect, useState } from "react";
import { Grid, TextField, Typography, Paper } from "@material-ui/core";
import { LoaderButton } from "../../common/LoaderButton";
import {
  NotificationStatus,
  StandardMessageTypes,
} from "../../common/Notifications";
import { AppContext } from "../../common/AppContext";
import { emailValidator } from "../../shared/fieldValidators";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useAuthenticationStyles } from "./authenticationStyles";
import { useGlobalStyles } from "../../shared/globalStyles";
import { useHistory } from "react-router-dom";
import { proxyClient } from "../../shared/proxy-client";
import {
  setTokenToLocalStorage,
  setRefreshTokenToLocalStorage,
} from "../../preferences/userPreferences";
import queryString from "query-string";

const Login = () => {
  const classes = useAuthenticationStyles();
  const globalClasses = useGlobalStyles();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [saveStatus, setSaveStatus] = useState({
    isSaving: false,
    hasSaved: false,
  });
  const { queueNotification, getUserDetailsFromApi, isMobile } =
    useContext(AppContext);
  const [passwordVisibility, setPasseordVisibility] = useState(false);
  const history = useHistory();
  const { search } = history.location;

  ["email", "password"].forEach((key) => (formData[key] = formData[key] || ""));

  const updateInvalidFields = (newData) => {
    const newErrors = {};
    if (!newData.email) newErrors.email = "Email is required";
    if (newData.email && emailValidator(newData.email))
      newErrors.email = "Please enter valid email address";
    if (!newData.password) newErrors.password = "Password is required";

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
      if (response.success && response.data) {
        if (response.data.token) {
          setTokenToLocalStorage(response.data.token);
          setRefreshTokenToLocalStorage(response.data.refreshToken);
        }
        await getUserDetailsFromApi();
        queueNotification({
          status: NotificationStatus.Success,
          message: "Login successful",
        });
        let redirectUrl = "/";
        if (search) {
          redirectUrl = queryString.parse(search).redirect;
        }
        history.push(redirectUrl);
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

  const navigateSignup = () => {
    history.push("/signup");
  };

  return (
    <Grid container>
      <Grid item container xs={12} className={classes.gradientBackground}>
        {!isMobile && (
          <Grid
            item
            xs={12}
            md={6}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Typography
                variant="h1"
                style={{ fontWeight: "bold", color: "white" }}
              >
                Shadang
              </Typography>
              <Typography
                style={{
                  fontWeight: "bold",
                  color: "white",
                  marginRight: 58,
                  marginTop: -20,
                }}
              >
                The digital art gallery
              </Typography>
            </div>
          </Grid>
        )}
        <Grid item xs={12} md={6} className={classes.credentialsContainer}>
          <Paper>
            <fieldset disabled={saveStatus.isSaving} style={{ border: "none" }}>
              <Grid container spacing={2} className={classes.form}>
                <Grid item xs={12} className={classes.iconContainer}>
                  <img
                    src="/images/shadang_logo.png"
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
                    onChange={(event) =>
                      updateFields({ email: event.target.value })
                    }
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={12} className={globalClasses.marginTop30}>
                  <LoaderButton
                    loading={saveStatus.isSaving}
                    onClick={handleSubmit}
                    fullWidth
                  >
                    Login
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
                  <Typography
                    className={globalClasses.link}
                    onClick={navigateSignup}
                  >
                    Signup
                  </Typography>
                </Grid>
              </Grid>
            </fieldset>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { Login };
