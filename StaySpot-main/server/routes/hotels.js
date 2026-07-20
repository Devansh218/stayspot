const express = require('express');
const Hotel = require('../models/hotels.js')
const {handleCreateHotel, getAllHotels, getHotel, handleUpdateHotel, handleDeleteHotel, countByCity, countByType, getHotelRooms} = require('../controllers/hotelControllers.js');
const { verifyAdmin } = require('../utils/verifyToken.js');

const router = express.Router();

router.post('/', verifyAdmin, handleCreateHotel);

router.get('/', getAllHotels);
router.get('/countbycity', countByCity);
router.get('/countbytype', countByType);

router.get('/find/:id', getHotel);

router.put('/:id', verifyAdmin, handleUpdateHotel);

router.delete('/:id', verifyAdmin, handleDeleteHotel);
router.get('/rooms/:id', getHotelRooms);


module.exports = router