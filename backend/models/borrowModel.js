const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    borrowDate: {
        type: Date,
        default: Date.now,
    },
    returnDate: {
        type: Date,
        default: function () {
            return new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
        }
    },
    isReturned: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Borrow = mongoose.model('Borrow', borrowSchema);
module.exports = Borrow;