import { StyleSheet } from "@react-pdf/renderer";
export const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        width: "100%",
        height: "100%",
    },
    slide: {
        width: "100%",
        height: "100%",
        position: "relative",
    },
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    text: {
        position: "absolute",
    },
    image: {
        position: "absolute",
    },
});
