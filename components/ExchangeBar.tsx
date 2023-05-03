import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import Dropdown from "./ui/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import DropdownCurrencyItem from "./DropdownCurrencyItem";
import { useEffect } from "react";
import {
    getCurrencyList,
    setSelectedFrom,
    setSelectedTo,
} from "../store/slices/currencies";
import { calculateRate } from "../store/slices/exchange";
export default function ExchangeBar() {
    const dispatch: AppDispatch = useDispatch();

    const currencies = useSelector((state: RootState) => state.currencies);

    const swapCurrencies = () => {
        const tempCurrencyFrom = currencies.selectedCurrencyFrom;
        dispatch(setSelectedFrom(currencies.selectedCurrencyTo));
        dispatch(setSelectedTo(tempCurrencyFrom));
    };

    useEffect(() => {
        dispatch(getCurrencyList());
    }, []);

    return (
        <View
            style={[styles.rootContainer, styles.barShadow]}
            onLayout={() => {
                dispatch(
                    setSelectedFrom(
                        currencies.list.filter(
                            (currency) => currency.Code === "EUR"
                        )[0]
                    )
                );
                dispatch(
                    setSelectedTo(
                        currencies.list.filter(
                            (currency) => currency.Code === "USD"
                        )[0]
                    )
                );
            }}
        >
            <Dropdown
                list={currencies.list}
                value={currencies.selectedCurrencyFrom ?? {}}
                propertyValue="Code"
                onItemPress={(selectedItem) => {
                    dispatch(setSelectedFrom(selectedItem as Currency));
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
                list={currencies.list}
                value={currencies.selectedCurrencyTo ?? {}}
                width={140}
                propertyValue="Code"
                onItemPress={(selectedItem) => {
                    dispatch(setSelectedTo(selectedItem as Currency));
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
