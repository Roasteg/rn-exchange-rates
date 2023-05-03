import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
type Exchange = {
    rates: Rate;
    selectedInput: "from" | "to";
    currentRate: number;
    from: string[];
    to: string[];
};

const initialState: Exchange = {
    rates: { amount: 0, base: "", date: "", rates: {} },
    selectedInput: "from",
    currentRate: 0,
    from: [],
    to: [],
};

const getExchangeRates = createAsyncThunk(
    "exchange/get",
    async (body: { base: string }) => {
        const ratesList = await axios.get<Rate>(
            `https://api.frankfurter.app/latest?base=${body.base}`
        );

        return ratesList.data;
    }
);

const exchangeSlice = createSlice({
    name: "exchange",
    initialState,
    reducers: {
        calculateRate(state) {
            const calculated: number =
                state.selectedInput === "from"
                    ? parseFloat(state.from.join("")) * state.currentRate
                    : parseFloat(state.to.join("")) / state.currentRate;
            if (!isNaN(calculated)) {
                state[state.selectedInput === "from" ? "to" : "from"] =
                    calculated.toFixed(3).toString().split("");
                return state;
            }
        },
        selectInput(state, action: PayloadAction<"from" | "to">) {
            state.selectedInput = action.payload;
            state[state.selectedInput] = [];
            return state;
        },
        setCurrentRate(state, action: PayloadAction<number>) {
            state.currentRate = action.payload;
            return state;
        },
        setInputValue(state, action: PayloadAction<string>) {
            if (action.payload === "C") {
                state[state.selectedInput] = [];
                return state;
            }
            if (action.payload === ",") {
                if (state[state.selectedInput].indexOf(",") > 0) return state;
                state[state.selectedInput].push(action.payload);
                return state;
            }
            state[state.selectedInput].push(action.payload);
            return state;
        },
        removeLastValue(state) {
            state[state.selectedInput].splice(-1);
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getExchangeRates.fulfilled, (state, { payload }) => {
            state.rates = payload;
            return state;
        });
    },
});
export default exchangeSlice.reducer;
export const calculateRate = exchangeSlice.actions.calculateRate;
export const selectInput = exchangeSlice.actions.selectInput;
export const setCurrentRate = exchangeSlice.actions.setCurrentRate;
export const setInputValue = exchangeSlice.actions.setInputValue;
export const removeLastValue = exchangeSlice.actions.removeLastValue;
export { getExchangeRates };
