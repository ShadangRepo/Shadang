import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center"
    },
    appBody: {
        padding: 20,
        marginTop: 68
    }
}))