const express = require('express');
const { handleCreateUser, handleLogin } = require('../controllers/authControllers');
const router = express.Router()

router.post('/register', handleCreateUser);
router.post('/login', handleLogin);


module.exports = router;