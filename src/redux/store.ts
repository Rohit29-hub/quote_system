import { configureStore } from "@reduxjs/toolkit";
import instant_quote from "../modules/instant_quote_system/redux/combineReducer";

const store = configureStore({
    reducer: {
        instant_quote: instant_quote 
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
export default store;