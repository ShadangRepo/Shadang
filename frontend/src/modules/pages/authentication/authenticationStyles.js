import { makeStyles } from "@material-ui/core";

const iconDimension = 80;

export const useAuthenticationStyles = makeStyles((theme) => ({
    gradientBackground: {
        display: "flex",
        flexDirection: "row",
        minHeight: 700,
        padding: 20,
        backgroundImage: "linear-gradient(to top right, rgb(252,32,94), rgb(215,10,132),rgb(167,8,207),rgb(63,180,254))"
    },
    credentialsContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.down('sm')]: {
            alignItems: "flex-start"
        }
    },
    form: {
        width: 400,
        padding: 20,
        [theme.breakpoints.down('sm')]: {
            width: "100%",
            top: 0,
            left: 0,
            margin: 0,
            padding: 0,
        }
    },
    circleIcon: {
        width: iconDimension,
        height: iconDimension,
        borderRadius: iconDimension / 2
    },
    iconContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
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
    displayFlexEnd: {
        display: "flex",
        justifyContent: "flex-end"
    }
}));