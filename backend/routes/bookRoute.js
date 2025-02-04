const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');

const { createBook,
    updateBook,
    deleteBook,
    searchBooks,
    getAllBooks } = require('../controllers/bookController');


router.get('/', getAllBooks);
router.post('/', isAdmin, createBook);
router.get('/search', searchBooks)
router.put('/:id', isAdmin, updateBook)
router.delete('/:id', isAdmin, deleteBook)

module.exports = router;