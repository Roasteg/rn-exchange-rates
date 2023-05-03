import { StyleSheet, View } from "react-native";
import Keypad from "../components/Keypad";
import ExchangeBar from "../components/ExchangeBar";
import { Theme } from "../utils/Colors";
import CurrencyInput from "../components/CurrencyInput";

export default function HomeScreen() {
    return (
        <View style={styles.rootContainer}>
            <View style={styles.currencySelectionContainer}>
                <ExchangeBar />
            </View>
            <View style={styles.currencyInputContainer}>
                <CurrencyInput />
            </View>
            <View style={styles.keypadContainer}>
                <Keypad /> 
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: Theme.background,
        zIndex: 1,
        position: "relative",
    },
    currencySelectionContainer: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    currencyInputContainer: {
        zIndex: 1,
        flex: 2,
        paddingHorizontal: 24,
    },
    keypadContainer: {
        marginBottom: 72,
        flex: 3,
    },
});
