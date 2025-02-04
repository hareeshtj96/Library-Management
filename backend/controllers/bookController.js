const Book = require('../models/bookModel');
const user = require('../models/userModel');

// create a book
// POST /api/books
const createBook = async (req, res) => {
    try {
        const { title, author, isbn, publishedYear, availableCopies } = req.body;
        const newBook = new Book({ title, author, isbn, publishedYear, availableCopies });
        await newBook.save();

        res.status(201).json(newBook)
    } catch (error) {
        console.error("Error creating book:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// Get all books
// GET /api/books
const getAllBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const books = await Book.find().skip((page - 1) * limit).limit(Number(limit))
        const totalBooks = await Book.countDocuments();

        res.json({
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit),
            currentPage: Number(page),
            books
        })
    } catch (error) {
        console.error("Error getting all books:", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


// Update book
// PUT /api/books/:id
const updateBook = async (req, res) => {
    try {
        const { title, author, isbn, publishedYear, availableCopies } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
            title,
            author,
            isbn,
            publishedYear,
            availableCopies
        },
            { new: true });

        if (!updatedBook) return res.status(404).json({ message: "Book not found" });
        res.json(updatedBook)
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// Search books
// GET /api/books/search
const searchBooks = async (req, res) => {
    try {
        const { search } = req.query;
        if (!search) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const query = search
            ? {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { author: { $regex: search, $options: "i" } },
                ],
            }
            : {};
        const books = await Book.find(query);
        res.json({ books });
    } catch (err) {
        console.error("Error in seaching books:", error)
        res.status(500).json({ message: err.message });
    }
};


// Delete book
// DELETE /api/books/:id
const deleteBook = async (req, res) => {
    try {
        const deleteBook = await Book.findByIdAndDelete(req.params.id);
        if (!deleteBook) return res.status(404).json({ message: "Book not found" });

        res.json({ message: "Book deleted successfully" })
    } catch (error) {
        console.error("Error in deleting book:", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


module.exports = {
    createBook,
    getAllBooks,
    deleteBook,
    updateBook,
    searchBooks
}



