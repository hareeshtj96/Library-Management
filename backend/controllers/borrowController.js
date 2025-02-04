const Borrow = require("../models/borrowModel");
const Book = require("../models/bookModel");
const User = require("../models/userModel");

//Borrow book
const borrowBook = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookId } = req.params;

        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: "Book not found" })

        if (book.availableCopies <= 0) return res.status(400).json({ message: "No Copies available" });

        // create a borrow entry
        const borrow = new Borrow({
            user: userId,
            book: bookId
        });
        await borrow.save();

        // decrease available copies
        book.availableCopies -= 1;
        await book.save();

        return res.status(200).json({ message: "Book borrowed successfully:", borrow })
    } catch (error) {
        console.error("Error borrowing book:", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// Return a book
const returnBook = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookId } = req.params
        const borrow = await Borrow.findOne({ user: userId, book: bookId, isReturned: false });

        if (!borrow) return res.status(404).json({ message: "No borrow found for this book" })

        borrow.isReturned = true;
        borrow.returnDate = Date.now();
        await borrow.save();

        // Increment the available copies of the book
        const book = await Book.findById(bookId);
        book.availableCopies += 1;
        await book.save();

        return res.status(200).json({ message: "Book returned successfully", borrow });
    } catch (error) {
        console.error("Error returning book:", error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

// History of borrow
const borrowHistory = async (req, res) => {
    console.log("enter hsitroy");

    try {
        const userId = req.user.id;

        const borrowHistory = await Borrow.find({ user: userId }).populate("book").sort({ borrowDate: -1 })
        console.log("borrow hiosotu:", borrowHistory);


        if (!borrowHistory.length) return res.status(404).json({ message: "No history found" })
        return res.status(200).json(borrowHistory);
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = { borrowBook, returnBook, borrowHistory }