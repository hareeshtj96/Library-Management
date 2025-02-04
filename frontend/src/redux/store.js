import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice';
import bookReducer from './books/bookSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        books: bookReducer
    }
});

export default store;