import { makeStyles } from "@material-ui/core";

export const useExhibitionStyles = makeStyles((theme) => ({
    exhibitionItemContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "calc(100% - 20px)",
        height: "100vh",
        padding: 10,
        backgroundColor: "#000",
        color: "#fff",
        marginBottom: 20
    },
    exhibitionItem: {
        height: "calc(100% - 20px)",
        width: "calc(100% - 20px)"
    },
    exhibitionOverlay: {
        position: "absolute",
        height: "calc(100% - 20px)",
        width: "calc(100% - 20px)",
        padding: 10
    },
    exhibitionChipPrimary: {
        color: "#fff",
        border: "1px solid #fff"
    },
    bottomOptions: {
        position: "absolute",
        bottom: 20,
        left: 20,
        width: "calc(100% - 40px)"
    }
}))