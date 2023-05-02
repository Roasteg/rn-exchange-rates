import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { Colors } from "../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import Dropdown from "./ui/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import DropdownCurrencyItem from "./DropdownCurrencyItem";
import { useEffect, useState } from "react";
import { getCurrencyList } from "../store/slices/currencies";
export default function ExchangeBar() {
    const dispatch: AppDispatch = useDispatch();

    const currencies = useSelector((state: RootState) => state.currencies);

    const [currencyFrom, setCurrencyFrom] = useState<object>({});
    const [currencyTo, setCurrencyTo] = useState<object>({});

    const swapCurrencies = () => {
        const tempCurrencyFrom = currencyFrom;
        setCurrencyFrom(currencyTo);
        setCurrencyTo(tempCurrencyFrom);
    };

    useEffect(() => {
        dispatch(getCurrencyList());
    }, []);

    if (currencies.length === 0) {
        return <ActivityIndicator />;
    }

    return (
        <View
            style={[styles.rootContainer, styles.barShadow]}
            onLayout={() => {
                setCurrencyFrom(
                    currencies.filter((currency) => currency.Code === "EUR")[0]
                );
                setCurrencyTo(
                    currencies.filter((currency) => currency.Code === "USD")[0]
                );
            }}
        >
            <Dropdown
                list={currencies}
                value={currencyFrom ?? {}}
                propertyValue="Code"
                onItemPress={(selectedItem) => {
                    setCurrencyFrom(selectedItem as object);
                }}
                width={140}
                itemPresentation={DropdownCurrencyItem}
            />
            <Pressable
                style={styles.swapButtonContainer}
                onPress={swapCurrencies}
            >
                <Ionicons name="swap-horizontal" size={24} color="black" />
            </Pressable>
            <Dropdown
                list={currencies}
                value={currencyTo ?? {}}
                width={140}
                propertyValue="Code"
                onItemPress={(selectedItem) => {
                    setCurrencyTo(selectedItem as object);
                }}
                itemPresentation={DropdownCurrencyItem}
            />
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
    swapButtonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
