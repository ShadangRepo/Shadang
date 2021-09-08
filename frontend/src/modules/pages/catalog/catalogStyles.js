import { makeStyles } from "@material-ui/core";

export const useCatalogStyles = makeStyles((theme) => ({
    categoryList: {
        display: "flex",
        justifyContent: "center"
    },
    imagePreviewContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E8E8E8",
        position: "relative",
        height: 350
    },
    imageOverlay: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        color: "#fff",
        opacity: 0.8,
        backgroundColor: "#E8E8E8"
    },
    slide: {
        textAlign: "center",
        background: "#fff",
        padding: 20
    },
    banner: {
        height: "100%"
    },
    exhibitionItemContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        width: "75%",
        [theme.breakpoints.down("sm")]: {
            width: "90%"
        },
        padding: 20
    },
    exhibitionItemsRoot: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    imageOptionsContainer: {
        display: "flex",
        alignItems: "center",
        height: 40,
        width: "calc(100% - 36px)"
    },
    imageContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "calc(100% - 36px)",
        padding: 20,
        height: 300,
        [theme.breakpoints.down("sm")]: {
            height: 150
        },
    },
    hr: {
        width: "100%"
    }
}))