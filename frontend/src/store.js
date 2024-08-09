import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk"
import authReducer from "./slices/authSlice";

const reducer = combineReducers({
    authState: authReducer
})

const store = configureStore({
    devTools: process.env.NODE_ENV === "development",
    reducer,
    middleware: () => [thunk]
})

export { store }