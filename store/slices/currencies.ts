import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

type Currencies = {
    list: Currency[];
    selectedCurrencyFrom: Currency;
    selectedCurrencyTo: Currency;
};

const initialState: Currencies = {
    list: [],
    selectedCurrencyFrom: { Code: "", Flag: "", Symbol: "" },
    selectedCurrencyTo: { Code: "", Flag: "", Symbol: "" },
};

const getStoredCurrencies = async () => {
    try {
        const values = await AsyncStorage.getItem("@currencies");
        return values !== null ? JSON.parse(values) : null;
    } catch (error) {
        return error;
    }
};

const storeCurrencies = async (value: object) => {
    try {
        const json = JSON.stringify(value);
        await AsyncStorage.setItem("@currencies", json);
    } catch (error) {
        return error;
    }
};

const getCurrencyList = createAsyncThunk(
    "currenies/get",
    async (_, {}) => {
        const storedValues = await getStoredCurrencies();

        if (storedValues) {
            return storedValues;
        }

        const currencyList = await axios.get(
            "https://gist.githubusercontent.com/manishtiwari25/d3984385b1cb200b98bcde6902671599/raw/917fd09bb377d4de742804049758585e0409e013/world_currency_symbols.json"
        );

        await storeCurrencies(currencyList.data);
        
        return currencyList.data;
    }
);

const currenciesSlice = createSlice({
    name: "currencies",
    initialState,
    reducers: {
        setSelectedFrom(state, action: PayloadAction<Currency>) {
            state.selectedCurrencyFrom = action.payload;
        },
        setSelectedTo(state, action: PayloadAction<Currency>) {
            state.selectedCurrencyTo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrencyList.fulfilled, (state, { payload }) => {
            state.list = payload;
            return state;
        });
    },
});
export default currenciesSlice.reducer;
export const setSelectedFrom = currenciesSlice.actions.setSelectedFrom;
export const setSelectedTo = currenciesSlice.actions.setSelectedTo;
export { getCurrencyList };
