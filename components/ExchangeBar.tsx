import { StyleSheet, View } from "react-native";
import { Colors } from "../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import Dropdown from "./ui/Dropdown";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import DropdownCountryItem from "./DropdownCountryItem";
export default function ExchangeBar() {
    const currencies = useSelector((state: RootState) => state.currencies);

    return (
        <View style={[styles.rootContainer, styles.barShadow]}>
            <Dropdown list={currencies} itemPresentation={DropdownCountryItem}/>
            <Ionicons name="swap-horizontal" size={24} color="black" />
            <Dropdown list={currencies} itemPresentation={DropdownCountryItem} />
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
        alignItems: "center",
    },
    barShadow: {
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { height: 3, width: 0 },
    },
});
