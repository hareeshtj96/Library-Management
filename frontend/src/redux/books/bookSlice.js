import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    books: [],
    loading: false,
    error: null,
    pagination: { currentPage: 1, totalPages: 1 }
};

const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        fetchBooks: (state) => {
            state.loading = true;
        },
        fetchBooksSuccess: (state, action) => {
            state.books = action.payload.books;
            state.pagination = action.pagination.pagination
            state.loading = false
        },
        fetchBooksFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false
        },
        addBook: (state, action) => {
            state.books.push(action.payload)
        },
        deleteBook: (state, action) => {
            state.books = state.books.filter(book => book.id !== action.payload)
        },
        updateBook: (state, action) => {
            const index = state.books.findIndex(book => book.id === action.payload.id)
            if (index >= 0) {
                state.books[index] = action.payload
            }
        }
    }
})

export const { fetchBooks, fetchBooksSuccess, fetchBooksFailure, addBook, deleteBook, updateBook } = bookSlice.actions;
export default bookSlice.reducers;