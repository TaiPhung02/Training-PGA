import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/authSlice";

export const store = configureStore({
    reducer: {
        auth: userReducer,
    },
});
