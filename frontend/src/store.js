import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk"
import authReducer from "./slices/authSlice";

const reducer=combineReducers({
    authState:authReducer
})

const store=configureStore({
    devTools:true,
    reducer,
    middleware:()=>[thunk]
})

export {store}