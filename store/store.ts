import { configureStore } from "@reduxjs/toolkit";
import currenciesSlice from "./slices/currencies";
import exchangeSlice from "./slices/exchange";

const store = configureStore({
    reducer: {
        currencies: currenciesSlice,
        exchange: exchangeSlice
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
