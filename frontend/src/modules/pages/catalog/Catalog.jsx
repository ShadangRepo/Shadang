import { Grid, Paper, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../common/AppContext";
import { CircleAvatar } from "../../common/CircleAvatar";
import { useCatalogStyles } from "./catalogStyles";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { proxyClient } from "../../shared/proxy-client";
import { NotificationStatus } from "../../common/Notifications";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import { useHistory } from "react-router-dom";

const Catalog = () => {
  const classes = useCatalogStyles();
  const { isMobile, queueNotification } = useContext(AppContext);
  const [exhibitions, setExhibitions] = useState([]);
  const history = useHistory();
  let waitForDoorOpen = null;

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
          exhibitions.map((item) => (
            <div
              key={item.id}
              className={classes.exhibitionDoor}
              onClick={() => openDoor(item.id)}
            >
              <div className={classes.doorLeft} id={`left_${item.id}`}>
                <Typography className={classes.doorText}>WelCome to</Typography>
              </div>
              <div className={classes.doorRight} id={`right_${item.id}`}>
                <Typography className={classes.doorText}>
                  {item.title}
                </Typography>
                <Typography className={classes.openText}>Open</Typography>
              </div>
            </div>
          ))}
      </Grid>
    </Grid>
  );
};
export { Catalog };
