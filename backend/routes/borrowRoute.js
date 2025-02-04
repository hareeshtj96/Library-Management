const express = require('express');
const router = express.Router();
const protectAuth = require("../middlewares/authMiddleware");

const { borrowBook, returnBook, borrowHistory } = require("../controllers/borrowController");


router.post('/:bookId', protectAuth, borrowBook);
router.post('/return/:bookId', protectAuth, returnBook);
router.get('/history', protectAuth, borrowHistory);

module.exports = router