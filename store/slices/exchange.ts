import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type Exchange = {
    selectedInput: "from" | "to",
    from: string[];
    to: string[];
};

const initialState: Exchange = {
    selectedInput: "from",
    from: [],
    to: []
}

const exchangeSlice = createSlice({
    name: "exchange",
    initialState,
    reducers: {
        selectInput(state, action: PayloadAction<"from" | "to">){
            state.selectedInput = action.payload;
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
});
export default exchangeSlice.reducer;
export const selectInput = exchangeSlice.actions.selectInput;
export const setInputValue = exchangeSlice.actions.setInputValue;
export const removeLastValue = exchangeSlice.actions.removeLastValue;
