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
    exhibitionItemsRoot: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },

    exhibitionDoor: {
        backgroundSize: "cover",
        backgroundColor: "#fff",
        height: 500,
        border: "solid 3px #006baf",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        width: "75%",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            height: 250
        },
    },
    doorText: {
        backgroundColor: "rgba(253,217,33,0.50)",
        color: "#333",
        fontSize: 24,
        fontWeight: "bold",
        height: 45,
        border: "solid 1px rgba(0,0,0,0.15)",
        borderWidth: "1px 0",
        position: "absolute",
        top: "50%",
        padding: "0 0 0 20px",
        left: "1px",
        right: "1px",
        marginTop: "-22.5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.down("sm")]: {
            fontSize: 18,
            height: 36,
        },
    },
    doorLeft: {
        position: "absolute",
        left: "0%",
        top: 0,
        bottom: 0,
        width: "50%",
        transition: "1s ease-in-out",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.40)",
        background: "rgba(226,226,226,0.35)",
        background: "-moz-linear-gradient(-45deg, rgba(226,226,226,0.35) 0%, rgba(219,219,219,0.35) 50%, rgba(209,209,209,0.35) 51%, rgba(254,254,254,0.35) 100%)",
        background: "-webkit-gradient(left top, right bottom, color-stop(0%, rgba(226,226,226,0.35)), color-stop(50%, rgba(219,219,219,0.35)), color-stop(51%, rgba(209,209,209,0.35)), color-stop(100%, rgba(254,254,254,0.35)))",
        background: "-webkit-linear-gradient(-45deg, rgba(226,226,226,0.35) 0%, rgba(219,219,219,0.35) 50%, rgba(209,209,209,0.35) 51%, rgba(254,254,254,0.35) 100%)",
        background: "-o-linear-gradient(-45deg, rgba(226,226,226,0.35) 0%, rgba(219,219,219,0.35) 50%, rgba(209,209,209,0.35) 51%, rgba(254,254,254,0.35) 100%)",
        background: "-ms-linear-gradient(-45deg, rgba(226,226,226,0.35) 0%, rgba(219,219,219,0.35) 50%, rgba(209,209,209,0.35) 51%, rgba(254,254,254,0.35) 100%)",
        background: "linear-gradient(135deg, rgba(226,226,226,0.35) 0%, rgba(219,219,219,0.35) 50%, rgba(209,209,209,0.35) 51%, rgba(254,254,254,0.35) 100%)",
        filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#e2e2e2', endColorstr='#fefefe', GradientType=1 )"
    },
    doorRight: {
        position: "absolute",
        right: "0%",
        top: 0,
        bottom: 0,
        width: "50%",
        transition: "1s ease-in-out",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.40)",
        background: "rgba(226,226,226,0.35)",
        background: "-moz-linear-gradient(-45deg, rgba(226,226,226,0.35) 0%, rgba(219,219,219,0.35) 50%, rgba(209,209,209,0.35) 51%, rgba(254,254,254,0.35) 100%)",
        background: "-webkit-gradient(left top, right bottom, color-stop(0%, rgba(226,226,226,0.35)), color-stop(50%, rgba(219,219,219,0.35)), color-stop(51%, rgba(209,209,209,0.35)), color-stop(100%, rgba(254,254,254,0.35)))",
        background: "-webkit-linear-gradient(-45deg, rgba(226,226,226,0.35) 0%, rgba(219,219,219,0.35) 50%, rgba(209,209,209,0.35) 51%, rgba(254,254,254,0.35) 100%)",
        background: "-o-linear-gradient(-45deg, rgba(226,226,226,0.35) 0%, rgba(219,219,219,0.35) 50%, rgba(209,209,209,0.35) 51%, rgba(254,254,254,0.35) 100%)",
        background: "-ms-linear-gradient(-45deg, rgba(226,226,226,0.35) 0%, rgba(219,219,219,0.35) 50%, rgba(209,209,209,0.35) 51%, rgba(254,254,254,0.35) 100%)",
        background: "linear-gradient(135deg, rgba(226,226,226,0.35) 0%, rgba(219,219,219,0.35) 50%, rgba(209,209,209,0.35) 51%, rgba(254,254,254,0.35) 100%)",
        filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#e2e2e2', endColorstr='#fefefe', GradientType=1 )"
    },
    openText: {
        position: "absolute",
        top: "60%",
        padding: 5,
        backgroundColor: "#006400",
        color: "#fff",
        fontWeight: "bold",
        marginLeft: 10,
        width: 100,
        borderRadius: 10,
        cursor: "pointer",
        [theme.breakpoints.down("sm")]: {
            fontSize: 12,
            width: 80,
        },
    }
}))