import { Chip, Grid, Paper, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../common/AppContext";
import { useCatalogStyles } from "./catalogStyles";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { proxyClient } from "../../shared/proxy-client";
import { NotificationStatus } from "../../common/Notifications";
import { useHistory } from "react-router-dom";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import moment from "moment";
import { dateFormat1, ExhibitionCategories } from "../../shared/constants";
import { Avatar } from "@material-ui/core";
import { useGlobalStyles } from "../../shared/globalStyles";

const Catalog = () => {
  const classes = useCatalogStyles();
  const { isMobile, queueNotification } = useContext(AppContext);
  const [exhibitions, setExhibitions] = useState([]);
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const globalClasses = useGlobalStyles();
  let waitForDoorOpen = null;

  const getUserList = async () => {
    try {
      const query = await proxyClient.get("/users/userList");
      const response = query.response;
      if (response.success) {
        setUsers(response.data);
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

  const getExhibitionList = async () => {
    try {
      const query = await proxyClient.get("/exhibitions/list");
      const response = query.response;
      if (response.success) {
        setExhibitions(response.data);
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
    getExhibitionList();
    getUserList();
    return () => {
      clearTimeout(waitForDoorOpen);
    };
  }, []);

  const bannerArray = [
    "https://firebasestorage.googleapis.com/v0/b/shadang-63a81.appspot.com/o/images%2FShadang%2Fshadang_banner_1.jpg?alt=media&token=22438fb2-8211-410d-af99-3d7eed489a4d",
    "https://firebasestorage.googleapis.com/v0/b/shadang-63a81.appspot.com/o/images%2FShadang%2Fshadang_logo_2.png?alt=media&token=2cd49fad-feff-4648-a925-373fc9079150",
  ];

  const openDoor = (id) => {
    let leftDoor = document.getElementById(`left_${id}`);
    let rightDoor = document.getElementById(`right_${id}`);

    clearTimeout(waitForDoorOpen);
    let isDoorOpen =
      leftDoor.style.left === "-50%" && rightDoor.style.right === "-50%";
    if (isDoorOpen) {
      leftDoor.style.left = "0%";
      rightDoor.style.right = "0%";
    } else {
      leftDoor.style.left = "-50%";
      rightDoor.style.right = "-50%";
      waitForDoorOpen = setTimeout(() => {
        history.push(`/viewExhibition/${id}`);
      }, 1000);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div>
          <div>
            <Slide autoplay={true} transitionDuration={500} duration={3000}>
              {bannerArray.map((item, i) => (
                <div
                  key={`${i}`}
                  className={classes.slide}
                  style={{ height: isMobile ? 120 : 400 }}
                >
                  <img src={item} className={classes.banner} alt="banner" />
                </div>
              ))}
            </Slide>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} className={classes.exhibitionItemsRoot}>
        {exhibitions &&
          exhibitions.map((item) => {
            let exhibitionCategory = ExhibitionCategories.find(
              (category) => category.label === item.category
            );
            let ExhibitionIcon = exhibitionCategory
              ? exhibitionCategory.Icon
              : null;

            let author = users && users.find(user => user.id === item.createdBy);
            return (
              <Grid key={item.id} container spacing={2}>
                {!isMobile && <Grid item xs={12} md={4} className={classes.UserDetailsContainer}>
                  <Paper className={`${classes.userCard} ${classes.exhibitionItemCommonStyle}`}>
                    <div>
                      <div className={classes.userCardHeader} />
                      {author ? <>
                        <div className={classes.userInfo}>
                          <div>
                            {author.profilePic ?
                              (<Avatar alt={`${author.firstName} ${author.lastName}`} src={author.profilePic} />) :
                              (<Avatar>
                                {`${author.firstName[0]}${author.lastName[0]}`}
                              </Avatar>
                              )}
                          </div>
                          <div className={`${globalClasses.ml10} ${globalClasses.mr10}`}>
                            <Typography className={classes.boldText}>
                              {`${author.firstName} ${author.lastName}`}
                            </Typography>
                          </div>
                        </div>
                        <div>
                        </div>
                      </> :
                        <Typography className={classes.exhibitionDescription}>
                          Author details not found.
                        </Typography>}
                    </div>
                  </Paper>
                </Grid>}
                <Grid item xs={12} md={8}>
                  <Paper className={`${classes.exhibitionDoor} ${classes.exhibitionItemCommonStyle}`}>
                    <div className={classes.doorLeft} id={`left_${item.id}`}>
                      <div className={classes.avatarContainer}>
                        <Avatar>
                          {ExhibitionIcon ? (
                            <ExhibitionIcon />
                          ) : item.title[0]}
                        </Avatar>
                        <div className={classes.exhibitionMeta}>
                          <Typography className={classes.boldText}>
                            {item.category} Exhibition
                          </Typography>
                          {item.isLive ?
                            <Typography className={classes.exhibitionDate}>
                              Open till: {moment(item.endDate).format(dateFormat1)}
                            </Typography> :
                            <Typography className={classes.exhibitionDate}>
                              Opening on: {moment(item.startDate).format(dateFormat1)}
                            </Typography>
                          }
                        </div>
                      </div>

                    </div>
                    <div className={classes.doorRight} id={`right_${item.id}`}>
                      <Typography className={classes.doorText}>
                        {item.title}
                      </Typography>
                      <Typography className={classes.exhibitionDescription}>
                        {item.description}
                      </Typography>
                      {item.isLive ? (
                        <Chip
                          label="Live"
                          variant="outlined"
                          color="primary"
                          className={classes.exhibitionStatusChip}
                          size={"small"}
                          avatar={
                            <FiberManualRecordIcon
                              color="primary"
                              classes={{ colorPrimary: classes.liveDot }}
                            />
                          }
                        />
                      ) : (
                        <Chip
                          label="Comming soon"
                          variant="outlined"
                          color="primary"
                          className={classes.exhibitionStatusChip}
                          size={"small"}
                          avatar={
                            <FiberManualRecordOutlinedIcon
                              color="primary"
                              classes={{ colorPrimary: classes.upcommingDot }}
                            />
                          }
                        />
                      )}
                    </div>
                    {item.isLive && (
                      <Typography
                        className={classes.openText}
                        onClick={() => openDoor(item.id)}
                      >
                        Visit
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            )
          })}
      </Grid>
    </Grid>
  );
};
export { Catalog };
