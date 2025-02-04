const express = require('express');
const { registerUser, loginuser, getProfile } = require("../controllers/userController");
const protectAuth = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginuser);
router.get('/profile', protectAuth, getProfile);

module.exports = router;