import { StyleSheet, Text, View } from "react-native";
import Input from "./ui/Input";
import { useMemo, useState } from "react";
import { Colors } from "../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { removeLastValue, selectInput } from "../store/slices/exchange";
export default function CurrencyInput() {
    const exchange = useSelector((state: RootState) => state.exchange);
    const currency = useSelector((state: RootState) => state.currencies);
    const dispatch: AppDispatch = useDispatch();

    const handleSwipeLeft = () => {
        dispatch(removeLastValue());
    };

    return (
        <View style={styles.rootContainer}>
            <View style={styles.inputAndSymbolContainer}>
                <View style={styles.currencyContainer}>
                    <Text style={styles.currencySymbol}>
                        {currency.selectedCurrencyFrom.Symbol}
                    </Text>
                </View>
                <View style={styles.inputContainer}>
                    <Input
                        value={exchange.from.join("")}
                        onPress={() => dispatch(selectInput("from"))}
                        onSwipeLeft={handleSwipeLeft}
                        style={
                            exchange.selectedInput === "from"
                                ? styles.inputActive
                                : styles.inputInactive
                        }
                    />
                </View>
            </View>
            <View style={styles.inputAndSymbolContainer}>
                <View style={styles.currencyContainer}>
                    <Text style={styles.currencySymbol}>
                        {currency.selectedCurrencyTo.Symbol}
                    </Text>
                </View>
                <View style={styles.inputContainer}>
                    <Input
                        value={exchange.to.join("")}
                        onPress={() => dispatch(selectInput("to"))}
                        onSwipeLeft={handleSwipeLeft}
                        style={
                            exchange.selectedInput === "to"
                                ? styles.inputActive
                                : styles.inputInactive
                        }
                    />
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "space-between",
    },
    inputActive: {
        borderBottomColor: Colors.active,
    },
    inputInactive: {
        borderBottomColor: Colors.inactive,
    },
    inputAndSymbolContainer: {
        flexDirection: "row",
    },
    currencyContainer: {
        width: 18,
    },
    currencySymbol: {
        fontSize: 18,
        color: Colors.inactive,
    },
    inputContainer: {
        flex: 1,
        marginBottom: 24,
        paddingHorizontal: 12,
    },
});
