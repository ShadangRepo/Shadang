import {
  Button,
  Grid,
  ListSubheader,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../common/AppContext";
import { CircleAvatar } from "../../common/CircleAvatar";
import { useAuthenticationStyles } from "./authenticationStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { useGlobalStyles } from "../../shared/globalStyles";
import { proxyClient } from "../../shared/proxy-client";
import { NotificationStatus } from "../../common/Notifications";
import moment from "moment";
import { dateFormat1, ExhibitionCategories } from "../../shared/constants";

const UserProfile = () => {
  const classes = useAuthenticationStyles();
  const globalClasses = useGlobalStyles();
  const { user, queueNotification } = useContext(AppContext);
  const [exhibitions, setExhibitions] = useState([]);

  const getExhibitions = async () => {
    try {
      const query = await proxyClient.get("/exhibitions/myExhibitions");
      const response = query.response;
      if (response.success) {
        let formattedResponse = response.data.map((item) => ({
          ...item,
          startDate: moment(item.startDate).format(dateFormat1),
          endDate: moment(item.endDate).format(dateFormat1),
        }));
        setExhibitions(formattedResponse);
      } else {
        queueNotification({
          status: NotificationStatus.Error,
          message: response.message,
        });
      }
    } catch (err) {
      queueNotification(err);
    }
  };

  useEffect(() => {
    getExhibitions();
  }, []);

  return (
    <Paper className={globalClasses.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CircleAvatar
            url={user.profileImage}
            size={200}
            alt={`${user.firstName[0]}${user.lastName[0]}`.toUpperCase()}
            label={`${user.firstName} ${user.lastName}`}
            labelStyle={{ fontSize: 16 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.centerAligned}>
            {user.contact}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.centerAligned}>
            {user.email}
          </Typography>
        </Grid>
      </Grid>
      <hr />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List
            style={{ width: "100%" }}
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                My Exhibitions
              </ListSubheader>
            }
          >
            {exhibitions.map((item) => {
              let exhibitionCategory = ExhibitionCategories.find(
                (category) => category.label === item.category
              );
              let ExhibitionIcon = exhibitionCategory
                ? exhibitionCategory.Icon
                : null;
              return (
                <ListItem key={item.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>
                      {ExhibitionIcon ? (
                        <ExhibitionIcon />
                      ) : item && item.title && item.title[0] ? (
                        item.title[0]
                      ) : (
                        ""
                      )}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={
                      <>
                        <div>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {item.description}
                          </Typography>
                        </div>
                        <div className={globalClasses.mt10}>
                          {item.startDate} - {item.endDate}
                        </div>
                      </>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};

export { UserProfile };
