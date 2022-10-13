import { StyleSheet } from "react-native";

//Color
import {COLORS} from "./colors";

const globalStyles = StyleSheet.create({
    contenedor: {
        width: "98%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },

    titulo: {
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "bold",
        color: '#fff'
    },

    input: {
        backgroundColor: "#fff",
        marginBottom: 20
    },

    boton:{
        backgroundColor: COLORS.secondary
    }
})

export default globalStyles; 