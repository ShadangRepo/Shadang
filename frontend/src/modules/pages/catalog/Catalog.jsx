import { Grid, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AppContext } from "../../common/AppContext";
import { CircleAvatar } from "../../common/CircleAvatar";
import { useCatalogStyles } from "./catalogStyles";

const Catalog = () => {
  const classes = useCatalogStyles();
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

  return (
    <Grid container spacing={2}>
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
