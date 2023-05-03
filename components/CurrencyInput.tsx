import { StyleSheet, Text, View } from "react-native";
import Input from "./ui/Input";
import { useEffect } from "react";
import { Colors } from "../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
    calculateRate,
    getExchangeRates,
    removeLastValue,
    selectInput,
    setCurrentRate,
} from "../store/slices/exchange";
export default function CurrencyInput() {
    const exchange = useSelector((state: RootState) => state.exchange);
    const currency = useSelector((state: RootState) => state.currencies);
    const dispatch: AppDispatch = useDispatch();

    const handleSwipeLeft = () => {
        dispatch(removeLastValue());
        dispatch(calculateRate());
    };

    const calculateTo = () => {
        const value = exchange.currentRate;

        if (isNaN(value)) {
            return "unknown";
        }
        return (1 / value).toFixed(2);
    };

    useEffect(() => {
        dispatch(
            getExchangeRates({ base: currency.selectedCurrencyFrom.Code })
        );
    }, [currency.selectedCurrencyFrom]);

    useEffect(() => {
        dispatch(
            setCurrentRate(
                exchange.rates.rates[currency.selectedCurrencyTo.Code]
            )
        );
    }, [exchange.rates.rates]);

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
                        onPress={() =>
                            exchange.selectedInput !== "from" &&
                            dispatch(selectInput("from"))
                        }
                        onSwipeLeft={handleSwipeLeft}
                        style={
                            exchange.selectedInput === "from"
                                ? styles.inputActive
                                : styles.inputInactive
                        }
                    />
                    <Text style={styles.subtitle}>
                        {`1 ${currency.selectedCurrencyFrom.Code} = ${
                            exchange.rates.rates[
                                currency.selectedCurrencyTo.Code
                            ] ?? "unknown"
                        } ${currency.selectedCurrencyTo.Code}`}
                    </Text>
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
                        onPress={() =>
                            exchange.selectedInput !== "to" &&
                            dispatch(selectInput("to"))
                        }
                        onSwipeLeft={handleSwipeLeft}
                        style={
                            exchange.selectedInput === "to"
                                ? styles.inputActive
                                : styles.inputInactive
                        }
                    />
                    <Text style={styles.subtitle}>
                        {`1 ${
                            currency.selectedCurrencyTo.Code
                        } = ${calculateTo()} ${
                            currency.selectedCurrencyFrom.Code
                        }`}
                    </Text>
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
    outerContainer: {
        flexDirection: "column",
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
    subtitle: {
        marginTop: 12,
        color: Colors.inactive,
    },
    inputContainer: {
        flex: 1,
        marginBottom: 24,
        paddingHorizontal: 12,
    },
});
