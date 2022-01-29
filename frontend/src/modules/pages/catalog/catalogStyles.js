import { makeStyles } from "@material-ui/core";

const headerHeight = 50;
const cardBorderRadius = 26;

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
        borderRadius: cardBorderRadius,
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
        top: headerHeight,
        bottom: 0,
        width: "50%",
        transition: "1s ease-in-out",
        // boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.40)",
        background: "rgba(100,100,226,0.35)",
        background: "-moz-linear-gradient(-45deg, rgba(100,100,226,0.35) 0%, rgba(190,190,219,0.35) 50%, rgba(150,150,209,0.35) 51%, rgba(209,209,254,0.35) 100%)",
        background: "-webkit-gradient(left top, right bottom, color-stop(0%, rgba(100,100,226,0.35)), color-stop(50%, rgba(190,190,219,0.35)), color-stop(51%, rgba(150,150,209,0.35)), color-stop(100%, rgba(209,209,254,0.35)))",
        background: "-webkit-linear-gradient(-45deg, rgba(100,100,226,0.35) 0%, rgba(190,190,219,0.35) 50%, rgba(150,150,209,0.35) 51%, rgba(209,209,254,0.35) 100%)",
        background: "-o-linear-gradient(-45deg, rgba(100,100,226,0.35) 0%, rgba(190,190,219,0.35) 50%, rgba(150,150,209,0.35) 51%, rgba(209,209,254,0.35) 100%)",
        background: "-ms-linear-gradient(-45deg, rgba(100,100,226,0.35) 0%, rgba(190,190,219,0.35) 50%, rgba(150,150,209,0.35) 51%, rgba(209,209,254,0.35) 100%)",
        background: "linear-gradient(135deg, rgba(100,100,226,0.35) 0%, rgba(190,190,219,0.35) 50%, rgba(150,150,209,0.35) 51%, rgba(209,209,254,0.35) 100%)",
        filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#e2e2e2', endColorstr='#fefefe', GradientType=1 )"
    },
    doorRight: {
        position: "absolute",
        right: "0%",
        top: headerHeight,
        bottom: 0,
        width: "50%",
        transition: "1s ease-in-out",
        // boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.40)",
        background: "rgba(100,100,226,0.35)",
        background: "-moz-linear-gradient(-45deg, rgba(100,100,226,0.35) 0%, rgba(190,190,219,0.35) 50%, rgba(150,150,209,0.35) 51%, rgba(209,209,254,0.35) 100%)",
        background: "-webkit-gradient(left top, right bottom, color-stop(0%, rgba(100,100,226,0.35)), color-stop(50%, rgba(190,190,219,0.35)), color-stop(51%, rgba(150,150,209,0.35)), color-stop(100%, rgba(209,209,254,0.35)))",
        background: "-webkit-linear-gradient(-45deg, rgba(100,100,226,0.35) 0%, rgba(190,190,219,0.35) 50%, rgba(150,150,209,0.35) 51%, rgba(209,209,254,0.35) 100%)",
        background: "-o-linear-gradient(-45deg, rgba(100,100,226,0.35) 0%, rgba(190,190,219,0.35) 50%, rgba(150,150,209,0.35) 51%, rgba(209,209,254,0.35) 100%)",
        background: "-ms-linear-gradient(-45deg, rgba(100,100,226,0.35) 0%, rgba(190,190,219,0.35) 50%, rgba(150,150,209,0.35) 51%, rgba(209,209,254,0.35) 100%)",
        background: "linear-gradient(135deg, rgba(100,100,226,0.35) 0%, rgba(190,190,219,0.35) 50%, rgba(150,150,209,0.35) 51%, rgba(209,209,254,0.35) 100%)",
        filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#e2e2e2', endColorstr='#fefefe', GradientType=1 )"
    },
    openText: {
        position: "absolute",
        bottom: 20,
        left: 20,
        padding: 2,
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
        right: 10,
        backgroundColor: "#fff"
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
        padding: 20,
        fontSize: 12,
        color: "#000",
        textAlign: "justify",
        overflowY: "auto",
        height: `calc(100% - ${headerHeight}px)`,
        [theme.breakpoints.down("sm")]: {
            padding: 10,
        },
    },
    grayText: {
        fontSize: 12,
        color: "#808080",
        textOverflow: "ellipsis",
        overflow: "hidden"
    },
    boldText: {
        fontSize: 12,
        color: "#000",
        fontWeight: "bold",
    },
    metaDataContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        fontSize: 12,
        [theme.breakpoints.down("sm")]: {
            padding: 10
        },
    },
    exhibitionMeta: {
        padding: "0 10px 0 10px"
    },
    userCard: {
        display: "flex",
        flexDirection: "column",
        width: 210,
        border: "solid 0px #fff",
    },
    userCardHeader: {
        backgroundColor: theme.palette.primary.main,
        height: headerHeight,
        display: "flex",
        alignItems: "center",
        borderTopLeftRadius: cardBorderRadius,
        borderTopRightRadius: cardBorderRadius
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
    },
    exhibitionTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        padding: 10,
        lineHeight: 1,
        left: "1px",
        right: "1px",
        display: "flex",
        alignItems: "center",
        width: `calc(100% - 40px)`,
        whiteSpace: "break-spaces",
        [theme.breakpoints.down("sm")]: {
            fontSize: 14,
            padding: 10,
        },
    },
    exhibitionIcon: {
        width: 32,
        height: 32,
        marginLeft: 10,
        backgroundColor: "#fff",
        color: theme.palette.primary.main
    },
    userName: {
        fontWeight: "bold",
        color: "#000",
        margin: "0 10px 0 50px"
    },
    userCardDetails: {
        padding: 10
    }
}))