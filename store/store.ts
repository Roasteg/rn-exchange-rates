import { configureStore } from "@reduxjs/toolkit";
import currenciesSlice from "./slices/currencies";

const store = configureStore({
    reducer: {
        currencies: currenciesSlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
