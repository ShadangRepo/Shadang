import React, { useContext, useState } from "react";
import { Grid, TextField, Typography, Paper } from "@material-ui/core";
import { LoaderButton } from "../../common/LoaderButton";
import {
  NotificationStatus,
  StandardMessageTypes,
} from "../../common/Notifications";
import { AppContext } from "../../common/AppContext";
import { emailValidator, phoneNumberRegex, specialCharacterRegex } from "../../shared/fieldValidators";
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
import { BrandName } from "../../shared/constants";

const Signup = () => {
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

  [
    "firstName",
    "lastName",
    "email",
    "contact",
    "password",
    "confirmPassword",
  ].forEach((key) => (formData[key] = formData[key] || ""));

  const updateInvalidFields = (newData) => {
    const newErrors = {};
    if (!newData.email) newErrors.email = "Email is required";
    if (newData.email && emailValidator(newData.email))
      newErrors.email = "Please enter valid email address";
    if (!newData.firstName) newErrors.firstName = "First Name is required";
    if (!newData.lastName) newErrors.lastName = "Last Name is required";
    if (!newData.contact) newErrors.contact = "Contact number is required";
    if (newData.contact && newData.contact.length !== 10)
      newErrors.contact = "Please enter valid contact";
    if (newData.contact && !phoneNumberRegex.test(newData.contact))
      newErrors.contact = "Please enter valid contact";
    if (!newData.email) newErrors.email = "Email is required";
    if (!newData.password) newErrors.password = "Password is required";
    if (
      newData.password &&
      (newData.password.length < 8 ||
        !specialCharacterRegex.test(newData.password))
    )
      newErrors.password =
        "Password must be 8 character long and should contain at least one special character";
    if (!newData.confirmPassword)
      newErrors.confirmPassword = "Password is required";
    if (
      newData.password &&
      newData.confirmPassword &&
      newData.password !== newData.confirmPassword
    )
      newErrors.confirmPassword = "Password does not match";

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

    let payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      contact: formData.contact,
      password: formData.password,
    };

    setSaveStatus({ hasSaved: true, isSaving: true });
    try {
      let query = await proxyClient.post("/auth/signup", payload, {
        noAuth: true,
      });
      const response = query.response;
      setSaveStatus({ hasSaved: true, isSaving: false });
      if (response.success && response.data && response.data.token) {
        setTokenToLocalStorage(response.data.token);
        setRefreshTokenToLocalStorage(response.data.refreshToken);
        await getUserDetailsFromApi();
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
  };

  const navigateLogin = () => {
    history.push("/login");
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
                {BrandName}
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
                <Grid item xs={12} className={globalClasses.mt20}>
                  <TextField
                    name="firstName"
                    label="First Name"
                    required
                    fullWidth
                    variant="outlined"
                    value={formData.firstName}
                    onChange={(event) =>
                      updateFields({ firstName: event.target.value })
                    }
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="lastName"
                    label="Last Name"
                    required
                    fullWidth
                    variant="outlined"
                    value={formData.lastName}
                    onChange={(event) =>
                      updateFields({ lastName: event.target.value })
                    }
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
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
                    name="contact"
                    label="Contact number"
                    required
                    fullWidth
                    variant="outlined"
                    value={formData.contact}
                    onChange={(event) =>
                      updateFields({ contact: event.target.value })
                    }
                    error={!!errors.contact}
                    helperText={errors.contact}
                    inputProps={{ maxLength: 10 }}
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
                <Grid item xs={12}>
                  <TextField
                    name="confirmPassword"
                    label="Confirm Password"
                    required
                    fullWidth
                    type="password"
                    variant="outlined"
                    value={formData.confirmPassword}
                    onChange={(event) =>
                      updateFields({ confirmPassword: event.target.value })
                    }
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                  />
                </Grid>
                <Grid item xs={12} className={globalClasses.mt30}>
                  <LoaderButton
                    loading={saveStatus.isSaving}
                    onClick={handleSubmit}
                    fullWidth
                  >
                    Signup
                  </LoaderButton>
                </Grid>
                <Grid
                  item
                  xs={12}
                  className={`${classes.centerAligned} ${globalClasses.mt20}`}
                >
                  <Typography>Already have account?</Typography>
                  <Typography
                    className={globalClasses.link}
                    onClick={navigateLogin}
                  >
                    Login
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

export { Signup };
