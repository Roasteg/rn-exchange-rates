import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import Keypad from "../components/Keypad";
import ExchangeBar from "../components/ExchangeBar";
import { Colors } from "../utils/Colors";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { getCurrencyList } from "../store/slices/currencies";
import { useEffect } from "react";
export default function HomeScreen() {
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrencyList());
    }, []);
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
        backgroundColor: Colors.backgroundDefault,
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
    },
    keypadContainer: {
        marginBottom: 48,
        flex: 3,
    },
});
