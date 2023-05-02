import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const initialState: Currency[] = [];

const getStoredCurrencies = async () => {
    try{
        const values = await AsyncStorage.getItem("@currencies");
        return values != null ? JSON.parse(values) : null;
    }
    catch (error){
        return error;
    }
}

const storeCurrencies = async (value: object) => {
    try {
        const json = JSON.stringify(value);
        await AsyncStorage.setItem("@currencies", json);
    } catch (error) {
        return error;
    }
}

const getCurrencyList = createAsyncThunk(
    "currenies/get",
    async (_, { rejectWithValue }) => {

        const storedValues = await getStoredCurrencies();

        if(storedValues) {
            return storedValues;
        }

        const currencyList = await axios.get<Currency[]>(
            "https://gist.githubusercontent.com/manishtiwari25/d3984385b1cb200b98bcde6902671599/raw/917fd09bb377d4de742804049758585e0409e013/world_currency_symbols.json"
        );

        await storeCurrencies(currencyList.data);

        return currencyList.data;
    }
);

const currenciesSlice = createSlice({
    name: "currencies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getCurrencyList.fulfilled,
            (state: Currency[], { payload }) => {
                state = payload;
                return state;
            }
        );
    },
});
export default currenciesSlice.reducer;
export { getCurrencyList };
