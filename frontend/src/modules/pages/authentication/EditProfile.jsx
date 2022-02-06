import { Grid, MenuItem, TextField, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router";
import { FormPage } from "../../common/FormPage";
import { UploadHandler } from "../../common/UploadHandler";
import {
  NotificationStatus,
  StandardMessageTypes,
} from "../../common/Notifications";
import { AppContext } from "../../common/AppContext";
import { proxyClient } from "../../shared/proxy-client";
import { useGlobalStyles } from "../../shared/globalStyles";
import { ProfessionList, SexConstants, SexList } from "../../shared/constants";
import { emailValidator, phoneNumberRegex } from "../../shared/fieldValidators";

const EditProfile = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const { queueNotification, setUser } = useContext(AppContext);
  const [saveStatus, setSaveStatus] = useState({
    isSaving: false,
    hasSaved: false,
  });
  const [errors, setErrors] = useState({});
  const [profileData, setProfileData] = useState({});
  const globalClasses = useGlobalStyles();
  const [loading, setLoading] = useState(false);

  ["firstName", "lastName", "email", "contact", "sex", "profession"].forEach(
    (key) => (profileData[key] = profileData[key] || "")
  );

  const fetchDetails = async () => {
    try {
      setLoading(true);
      let query = await proxyClient.get("/users/getUserDetails");
      const response = query.response;
      if (response.success && response.data) {
        setUser(response.data); //set user in context
        setProfileData({
          ...response.data,
          profilePic: response.data.profilePic
            ? [
                {
                  url: response.data.profilePic,
                  active: true,
                  id: "profile_image",
                },
              ]
            : null,
        });
      } else {
        queueNotification({
          status: NotificationStatus.Error,
          message: response.message,
        });
        setProfileData({});
      }
      setLoading(false);
    } catch (err) {
      queueNotification(err);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const updateFields = (newValues) => {
    const newFormData = { ...profileData, ...newValues };
    setProfileData(newFormData);
    if (saveStatus.hasSaved) updateInvalidFields(newFormData);
  };

  const onImagesChange = (urlList) => {
    updateFields({ profilePic: urlList });
  };

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

    const isInvalid = Object.keys(newErrors).length > 0;
    setErrors(newErrors);
    return isInvalid;
  };

  const handleSaveProfile = async () => {
    if (updateInvalidFields(profileData)) {
      queueNotification(StandardMessageTypes.ValidationErrors);
      setSaveStatus({ hasSaved: true, isSaving: false });
      return;
    }

    setSaveStatus({ hasSaved: true, isSaving: true });
    let payload = {
      ...profileData,
      profilePic: profileData.profilePic ? profileData.profilePic.url : null,
    };

    try {
      let query = await proxyClient.put("/users/updateProfile", payload);

      const response = query.response;
      setSaveStatus({ hasSaved: true, isSaving: false });
      if (response.success) {
        queueNotification({
          status: NotificationStatus.Success,
          message: response.message,
        });

        await fetchDetails();
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
          onSave={handleSaveProfile}
          onCancel={() =>
            history.push(`${path.split("/").slice(0, -1).join("/")}`)
          }
          blocked={saveStatus.isSaving || loading}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Edit Profile</Typography>
            </Grid>
            <Grid item xs={12}>
              <UploadHandler
                profileView={true}
                accept="image/*"
                defaultValue={
                  profileData.profilePic || [
                    {
                      url: `/images/default_profile_${
                        profileData.sex === SexConstants.FEMALE
                          ? SexConstants.FEMALE
                          : SexConstants.MALE
                      }.png`,
                      active: true,
                      id: "profile_image",
                    },
                  ]
                }
                onChange={(urlList) => onImagesChange(urlList)}
                folderName="profiles"
                viewSize={100}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="firstName"
                label="First Name"
                required
                fullWidth
                variant="outlined"
                value={profileData.firstName}
                onChange={(event) =>
                  updateFields({ firstName: event.target.value })
                }
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="lastName"
                label="Last Name"
                required
                fullWidth
                variant="outlined"
                value={profileData.lastName}
                onChange={(event) =>
                  updateFields({ lastName: event.target.value })
                }
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="email"
                label="Email"
                required
                fullWidth
                disabled
                variant="outlined"
                value={profileData.email}
                onChange={(event) =>
                  updateFields({ email: event.target.value })
                }
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="contact"
                label="Contact number"
                required
                fullWidth
                variant="outlined"
                value={profileData.contact}
                onChange={(event) =>
                  updateFields({ contact: event.target.value })
                }
                error={!!errors.contact}
                helperText={errors.contact}
                inputProps={{ maxLength: 10 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                error={!!errors.sex}
                helperText={errors.sex}
                id="sex"
                label="Sex"
                variant="outlined"
                value={profileData.sex}
                onChange={(event) => updateFields({ sex: event.target.value })}
              >
                <MenuItem key={"-1"} value={""}>
                  Select
                </MenuItem>
                {SexList.map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                error={!!errors.profession}
                helperText={errors.profession}
                id="profession"
                label="Profession"
                variant="outlined"
                value={profileData.profession}
                onChange={(event) =>
                  updateFields({ profession: event.target.value })
                }
              >
                <MenuItem key={"-1"} value={""}>
                  Select
                </MenuItem>
                {ProfessionList.map((p) => (
                  <MenuItem key={`${p}`} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </FormPage>
      </Grid>
    </Grid>
  );
};

export { EditProfile };
