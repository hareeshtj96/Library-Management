import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false
        }
    }
});

export const { login, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;