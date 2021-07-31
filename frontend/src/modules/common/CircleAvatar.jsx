import { Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 10,
  },
}));
const CircleAvatar = (props) => {
  const { url, alt, size, style, label, selected, onClick } = props;
  const theme = useTheme();
  const classes = useStyles();

  const circleAvatarStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    width: size || 50,
    height: size || 50,
    borderRadius: selected ? (size ? size / 2 : 25) + 2 : size ? size / 2 : 25,
    boxShadow: selected ? `0 0 10px ${theme.palette.primary.dark}` : "none",
    border: selected ? `2px solid #fff` : "none",
    backgroundColor: "#DCDCDC",
    cursor: onClick ? "pointer" : "auto",
    ...style,
  };

  return (
    <>
      {url ? (
        <div className={classes.avatarContainer}>
          <img
            src={url}
            alt={alt || "image"}
            style={circleAvatarStyle}
            onClick={onClick || undefined}
          />
          {label && (
            <Typography align="center" className={classes.label}>
              {label}
            </Typography>
          )}
        </div>
      ) : (
        <div className={classes.avatarContainer}>
          <div style={circleAvatarStyle} onClick={onClick || undefined}>
            <Typography style={{ fontWeight: "bold" }}>{alt}</Typography>
          </div>
          {label && (
            <Typography align="center" className={classes.label}>
              {label}
            </Typography>
          )}
        </div>
      )}
    </>
  );
};

export { CircleAvatar };
