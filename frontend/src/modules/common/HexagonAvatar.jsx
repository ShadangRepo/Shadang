import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    hexagon: {
        backgroundColor: "#DCDCDC",
        clipPath: "polygon(0% 25%, 50% 0, 100% 25%, 100% 75%, 50% 100%, 0% 75%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        color: "#fff",
        position: "relative"
    },
    waterMarkName: {
        fontWeight: "bold"
    },
    shadow: {
        background: "radial-gradient(#F5F5F5, #E0E0E0)"
    }
}));

const defaultSize = 100;
const borderSize = 10;
const shadowWidth = 2;

const HexagonAvatar = ({
    src,
    firstName = "",
    lastName = "",
    size,
    style = {},
    onClick = () => { },
    children
}) => {
    const classes = useStyles();
    return <div className={`${classes.hexagon} ${classes.shadow}`} style={{ height: size + shadowWidth || defaultSize + shadowWidth, width: size + shadowWidth || defaultSize + shadowWidth, ...style }}>
        <div onClick={onClick} className={classes.hexagon} style={{ height: size || defaultSize, width: size || defaultSize, backgroundColor: "#fff" }}>
            <div className={classes.hexagon} style={{ height: size - borderSize || defaultSize - borderSize, width: size - borderSize || defaultSize - borderSize }}>
                {src ?
                    <img src={src} alt="Avatar" style={{ height: size - borderSize || defaultSize - borderSize, width: size - borderSize || defaultSize - borderSize }} /> :
                    <Typography className={classes.waterMarkName}>{`${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`}</Typography>
                }
                {children}
            </div>
        </div>
    </div>
}

export { HexagonAvatar }