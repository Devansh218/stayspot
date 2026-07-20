const express = require('express');
const user = require('../models/user.js')
const {handleCreateUser, getAllUsers, getUser, handleUpdateUser, handleDeleteUser} = require('../controllers/userControllers.js');
const { verifyUser, verifyAdmin } = require('../utils/verifyToken.js');

const router = express.Router();

router.get('/', verifyAdmin, getAllUsers);

router.get('/:id', getUser);

router.put('/:id',verifyUser, handleUpdateUser);

router.delete('/:id',verifyUser, handleDeleteUser);

// router.get('/check/token', verifyToken, (req, res) => {
//     res.json({message: 'token is valid'})
// })
// router.get('/checkuser/:id', verifyUser, (req, res) => {
//     res.json({message: 'You can delete this user'})
// })
// router.get('/checkadmin/:id', verifyAdmin, (req, res) => {
//     res.json({message: 'You can delete this user'})
// })

module.exports = router