// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface User {
    id: number;
    email: string;
    name: string;
    gender: string;
    avatar: string;
    region: number;
    state: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    token: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        loginFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFail, logout } =
    authSlice.actions;

export default authSlice.reducer;
