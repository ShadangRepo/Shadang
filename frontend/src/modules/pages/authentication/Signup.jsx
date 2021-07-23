import React, { useContext, useState } from "react";
import {
  Grid,
  TextField,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import { LoaderButton } from "../../common/LoaderButton";
import { StandardMessageTypes } from "../../common/Notifications";
import { AppContext } from "../../common/AppContext";
import { emailValidator } from "../../shared/fieldValidators";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useStyles } from "./styles";
import { useGlobalStyles } from "../../shared/globalStyles";
import { useHistory } from "react-router-dom";
import { PhoneField } from "../../common/MaskedInputs";
// eslint-disable-next-line no-useless-escape
var specialCharacterRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

const Signup = () => {
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [saveStatus, setSaveStatus] = useState({
    isSaving: false,
    hasSaved: false,
  });
  const { queueNotification } = useContext(AppContext);
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

  const handleSubmit = () => {
    if (updateInvalidFields(formData)) {
      queueNotification(StandardMessageTypes.ValidationErrors);
      setSaveStatus({ hasSaved: true, isSaving: false });
      return;
    }

    setSaveStatus({ hasSaved: true, isSaving: true });
    setTimeout(() => {
      setSaveStatus({ hasSaved: true, isSaving: false });
    }, 2000);
  };

  const navigateLogin = () => {
    history.push("/login");
  };

  return (
    <Card className={classes.rootSignup}>
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
              onChange={(event) => updateFields({ email: event.target.value })}
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
              InputProps={{ inputComponent: PhoneField }}
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
          <Grid
            item
            xs={12}
            className={`${classes.rowReverse} ${classes.btnContainer}`}
          >
            <LoaderButton loading={saveStatus.isSaving} onClick={handleSubmit}>
              Signup
            </LoaderButton>
          </Grid>
          <Grid
            item
            xs={12}
            className={`${classes.centerAligned} ${globalClasses.marginTop20}`}
          >
            <Typography>Already have account?</Typography>
            <Typography className={globalClasses.link} onClick={navigateLogin}>
              Login
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export { Signup };
