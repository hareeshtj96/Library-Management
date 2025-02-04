const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    publishedYear: {
        type: Number,
        required: true,
    },
    availableCopies: {
        type: Number,
        default: 1
    }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;