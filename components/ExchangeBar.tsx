import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../utils/Colors";
import {Ionicons} from "@expo/vector-icons";
import Dropdown from "./ui/CountryDropdown";
export default function ExchangeBar() {
    return (
        <View style={[styles.rootContainer, styles.barShadow]}>
            <Dropdown />
            <Ionicons name="swap-horizontal" size={24} color="black" />
            <Dropdown />
        </View>
    );
}
const styles = StyleSheet.create({
    rootContainer: {
        backgroundColor: Colors.exchangeBarDefault,
        borderRadius: 20,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        height: 70,
        alignItems: "center"
    },
    barShadow: {
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { height: 3, width: 0 },
    },
});
