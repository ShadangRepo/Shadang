import { Grid, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AppContext } from "../../common/AppContext";
import { CircleAvatar } from "../../common/CircleAvatar";
import { useCatalogStyles } from "./catalogStyles";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Catalog = () => {
  const classes = useCatalogStyles();
  const { isMobile } = useContext(AppContext);
  // const [selectedCategory, setSelectedCategory] = useState(1);
  // const [imageVisibility, setImageVilibility] = useState(false);
  // const categoryArray = [
  //   {
  //     id: 1,
  //     url: "https://picsum.photos/200/300/?blur",
  //     name: "All",
  //   },
  //   {
  //     id: 2,
  //     url: "https://picsum.photos/id/237/200/300",
  //     name: "Fassion",
  //   },
  //   {
  //     id: 3,
  //     // url: "https://picsum.photos/seed/picsum/200/300",
  //     name: "Bonsai Tree",
  //   },
  //   {
  //     id: 4,
  //     url: "https://picsum.photos/200/300/?blur",
  //     name: "Craft",
  //   },
  //   {
  //     id: 5,
  //     url: "https://picsum.photos/200/300/?blur=2",
  //     name: "Exhibition",
  //   },
  // ];

  const bannerArray = [
    "https://firebasestorage.googleapis.com/v0/b/shadang-63a81.appspot.com/o/images%2FShadang%2Fshadang_banner_1.jpg?alt=media&token=22438fb2-8211-410d-af99-3d7eed489a4d",
    "https://firebasestorage.googleapis.com/v0/b/shadang-63a81.appspot.com/o/images%2FShadang%2Fshadang_logo_2.png?alt=media&token=2cd49fad-feff-4648-a925-373fc9079150",
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div>
          <div>
            <Slide autoplay={true}>
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
      {/* <Grid item xs={12} className={classes.categoryList}>
        {categoryArray.map((category, i) => (
          <CircleAvatar
            key={`${i}`}
            url={category.url}
            alt={category.name.substring(0, 2).toUpperCase()}
            style={{ marginLeft: 10, marginRight: 10 }}
            label={category.name}
            selected={category.id === selectedCategory}
            onClick={() => setSelectedCategory(category.id)}
          />
        ))}
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        className={classes.imagePreviewContainer}
        onMouseOver={() => setImageVilibility(true)}
        onMouseOut={() => setImageVilibility(false)}
        onTouchStart={async () => setImageVilibility(true)}
        onTouchEnd={async () => setImageVilibility(false)}
      >
        {!imageVisibility && (
          <div className={classes.imageOverlay}>
            Move cursor over to veiw image
          </div>
        )}
        <img src="https://picsum.photos/id/237/200/300" alt="Image" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography>Name of atrist</Typography>
      </Grid> */}
    </Grid>
  );
};
export { Catalog };
