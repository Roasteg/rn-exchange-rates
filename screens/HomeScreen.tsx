import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import Keypad from "../components/Keypad";
import ExchangeBar from "../components/ExchangeBar";
import { Colors } from "../utils/Colors";
export default function HomeScreen() {
    return (
        <View style={styles.rootContainer}>
            <View style={styles.currencySelectionContainer}>
                <ExchangeBar />
            </View>
            <View style={styles.currencyInputContainer}>
                <Text>Type</Text>
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
        backgroundColor: Colors.backgroundDefault
    },
    currencySelectionContainer: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center"
    },
    currencyInputContainer: {
        flex: 2
    },
    keypadContainer: {
        marginBottom: 48,
        flex: 3
    },
});
