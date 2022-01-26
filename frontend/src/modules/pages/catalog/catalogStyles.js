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
    exhibitionItemCommonStyle: {
        height: 350,
        borderRadius: 26,
        marginTop: 20,
        [theme.breakpoints.down("sm")]: {
            height: 220
        },
    },
    exhibitionDoor: {
        backgroundSize: "cover",
        backgroundColor: "#fff",
        position: "relative",
        overflow: "hidden",
        width: "80%",
        border: "solid 3px #fff",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
    doorText: {
        color: theme.palette.primary.main,
        fontSize: 24,
        fontWeight: "bold",
        padding: 20,
        lineHeight: 1,
        left: "1px",
        right: "1px",
        display: "flex",
        alignItems: "center",
        width: `calc(100% - 40px)`,
        whiteSpace: "break-spaces",
        [theme.breakpoints.down("sm")]: {
            fontSize: 18,
            padding: 10,
        },
    },
    doorLeft: {
        position: "absolute",
        left: "0%",
        top: 0,
        bottom: 0,
        width: "50%",
        transition: "1s ease-in-out",
        // boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.40)",
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
        // boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.40)",
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
        top: "50%",
        left: "calc(50% - 50px)",
        padding: 5,
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
        fontWeight: "bold",
        width: 100,
        borderRadius: 10,
        cursor: "pointer",
        textAlign: "center",
        [theme.breakpoints.down("sm")]: {
            fontSize: 12,
            width: 80,
            left: "calc(50% - 40px)",
        },
    },
    exhibitionStatusChip: {
        position: "absolute",
        bottom: 10,
        right: 10
    },
    liveDot: {
        color: `#f00 !important`,
        backgroundColor: "#fff0 !important"
    },
    upcommingDot: {
        color: `${theme.palette.primary.main} !important`,
        backgroundColor: "#fff0 !important"
    },
    UserDetailsContainer: {
        display: "flex",
        justifyContent: "end"
    },
    exhibitionDescription: {
        padding: "0 20px 0 20px",
        fontSize: 12,
        color: "#808080",
        textAlign: "justify",
        [theme.breakpoints.down("sm")]: {
            padding: "0 10px 0 10px",
        },
    },
    exhibitionDate: {
        fontSize: 12,
        color: "#808080",
    },
    boldText: {
        fontSize: 12,
        color: "#808080",
        fontWeight: "bold",
    },
    avatarContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        fontSize: 12
    },
    exhibitionMeta: {
        padding: "0 10px 0 10px"
    },
    userCard: {
        display: "flex",
        flexDirection: "column",
        width: "60%",
        border: "solid 0px #fff",
        overflow: "hidden"
    },
    userCardHeader: {
        backgroundColor: theme.palette.primary.main,
        height: 40
    },
    userInfo: {
        height: 105,//calculated as 30 % of total height of exhibitionDoor
        backgroundColor: "#F0F0F0",
        display: "flex",
        alignItems: "center",
        padding: 10,
        [theme.breakpoints.down("sm")]: {
            height: 66
        },
    }
}))