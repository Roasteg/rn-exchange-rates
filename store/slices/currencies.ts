import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: Currency[] = [];

const getCurrencyList = createAsyncThunk(
    "currenies/get",
    async () => {
        const currencyList = await axios.get<Currency[]>(
            "https://gist.githubusercontent.com/manishtiwari25/d3984385b1cb200b98bcde6902671599/raw/917fd09bb377d4de742804049758585e0409e013/world_currency_symbols.json"
        );
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
                return payload;
            }
        );
    },
});
export default currenciesSlice.reducer;
export { getCurrencyList };
