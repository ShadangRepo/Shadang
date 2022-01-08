import { Chip, Grid, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { AppContext } from "../../common/AppContext";
import { NotificationStatus } from "../../common/Notifications";
import { proxyClient } from "../../shared/proxy-client";
import { useExhibitionStyles } from "./exhibitionStyles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import HomeIcon from "@material-ui/icons/Home";

const ViewExhibition = () => {
  const { exhibitionId = "0" } = useParams();
  const classes = useExhibitionStyles();
  const { queueNotification, user } = useContext(AppContext);
  const history = useHistory();
  const [exhibitionItems, setExhibitionItems] = useState([]);

  const getExhibitionItems = async () => {
    try {
      const query = await proxyClient.get(`/exhibitions/items`, {
        exhibitionId,
      });
      const response = query.response;
      if (response.success) {
        if(response.data && response.data.length>0){
        let formattedResponse = response.data.map((item) => ({
          ...item,
          likesCount: item.likedBy ? item.likedBy.length : 0,
          liked:
            item.likedBy && item.likedBy.length > 0
              ? item.likedBy.includes(user.id)
              : false,
        }));
        setExhibitionItems(formattedResponse);
      }else{
        queueNotification({
          status: NotificationStatus.Error,
          message: "No images in this exhibition",
        });
        history.push("/");
      }
      } else {
        queueNotification({
          status: NotificationStatus.Error,
          message: response.message,
        });
        history.push("/");
      }
    } catch (err) {
      queueNotification(err);
    }
  };

  useEffect(() => {
    getExhibitionItems();
  }, []);

  const imageLoad = (event) => {
    let imageWidth = event.target.clientWidth;
    let imageHeight = event.target.clientHeight;
    let imageRatio = imageWidth / imageHeight;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;

    if (imageRatio > windowRatio) {
      event.target.style.width = "100%";
    } else {
      event.target.style.height = "100%";
    }
  };

  const handleLikeClick = (id, liked) => {
    let files = exhibitionItems.map((item) =>
      item.id === id
        ? {
            ...item,
            liked,
            likesCount:
              liked === true
                ? parseInt(item.likesCount) + 1
                : parseInt(item.likesCount) - 1,
          }
        : item
    );
    setExhibitionItems(files);
    proxyClient.put(`/exhibitions/like-item`, {
      liked,
      itemId: id,
    });
  };

  return (
    <Grid container>
      {exhibitionItems.map((item) => (
        <Grid
          item
          xs={12}
          key={`${item.id}`}
          className={classes.exhibitionItemContainer}
        >
          <img
            src={item.url}
            alt="picture"
            id={`image_${item.id}`}
            onLoad={imageLoad}
          />
          <div className={classes.exhibitionOverlay}>
            <Grid container className={classes.bottomOptions}>
              <Grid item xs={12} md={6}>
                <Chip
                  label={`${item.likesCount}`}
                  variant="outlined"
                  color="primary"
                  icon={item.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  classes={{ colorPrimary: classes.exhibitionChipPrimary }}
                  onClick={() => handleLikeClick(item.id, !item.liked)}
                />
                <Chip
                  label="Home"
                  variant="outlined"
                  color="primary"
                  icon={<HomeIcon />}
                  classes={{ colorPrimary: classes.exhibitionChipPrimary }}
                  style={{ marginLeft: 10 }}
                  onClick={() => history.push("/")}
                />
              </Grid>
            </Grid>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export { ViewExhibition };
