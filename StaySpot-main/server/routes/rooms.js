const express = require('express');
const {handleCreateRoom, getAllRooms, getRoom, handleUpdateRoom, handleDeleteRoom, updateRoomAvailability} = require('../controllers/roomControllers.js');
const { verifyAdmin } = require('../utils/verifyToken.js');

const router = express.Router();

router.post('/:hotelid', handleCreateRoom);

router.get('/', verifyAdmin, getAllRooms);

router.get('/:id', getRoom);

router.put('/:id', verifyAdmin, handleUpdateRoom);
router.put('/availability/:id', updateRoomAvailability);

router.delete('/:id', handleDeleteRoom);


module.exports = router