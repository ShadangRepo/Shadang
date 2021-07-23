import { makeStyles } from "@material-ui/core";

const iconDimension = 100;

export const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        position: "absolute",
        top: "20%",
        left: "50%",
        margin: "0 0 0 -250px",
        [theme.breakpoints.down('sm')]: {
            width: "100%",
            top: 0,
            left: 0,
            margin: 0,
        }
    },
    rootSignup: {
        width: 500,
        position: "absolute",
        top: "10%",
        left: "50%",
        margin: "0 0 0 -250px",
        [theme.breakpoints.down('sm')]: {
            width: "100%",
            top: 0,
            left: 0,
            margin: 0,
        }
    },
    rowReverse: {
        display: "flex",
        flexDirection: "row-reverse",
    },
    btnContainer: {
        margin: "20px 10px 0 0",
    },
    circleIcon: {
        width: iconDimension,
        height: iconDimension,
        borderRadius: iconDimension / 2,
        border: "1px solid #DCDCDC",
    },
    iconContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    hiddenPassword: {
        height: "0px",
        visibility: "hidden",
        overflow: "hidden",
        padding: "0px !important",
    },
    showPasswordField: {
        transition: "height 0.3s ease, padding 0.3s ease",
        height: "90px",
        padding: "8px !important",
        transitionDuration: "0.3s",
        visibility: "visible",
        overflow: "hidden",
    },
    passwordToggle: {
        cursor: "pointer",
        color: "#C0C0C0",
    },
    centerAligned: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center"
    },
}));