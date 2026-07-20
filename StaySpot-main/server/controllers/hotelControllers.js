const Hotel = require("../models/hotels");
const rooms = require("../models/rooms");

const handleCreateHotel = async (req, res) => {
    const newHotel = await new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(201).json(savedHotel);
    } catch (err) {
        res.status(500).json(err);
    }
};

const handleUpdateHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(hotel);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getAllHotels = async (req, res) => {
    const {min, max, ...other} = req.query;
    try {
        const hotels = await Hotel.find({...other, cheapestPrice: {$gt:min || 1, $lt: max||99999}})
        res.json(hotels);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.json(hotel);
    } catch (err) {
        res.status(500).json(err);
    }
};

const countByCity = async (req, res) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(
            cities.map((city) => Hotel.countDocuments({ city: city }))
        );
        res.json(list);
    } catch (err) {
        res.status(500).json(err);
    }
};

const countByType = async (req, res) => {
    const hotelCount = await Hotel.countDocuments({type: 'hotel'})
    const apartmentCount = await Hotel.countDocuments({type: 'apartment'})
    const resortCount = await Hotel.countDocuments({type: 'resort'})
    const villaCount = await Hotel.countDocuments({type: 'villa'})
    const cabinCount = await Hotel.countDocuments({type: 'cabin'})

    res.json([
        { type: 'hotel', count: hotelCount },
        { type: 'apartment', count: apartmentCount },
        { type:'resort', count: resortCount },
        { type: 'villa', count: villaCount },
        { type: 'cabin', count: cabinCount }
    ]);
};

const handleDeleteHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        res.json({ message: "hotel deletted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getHotelRooms = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map(room => rooms.findById(room)));
        res.status(200).json(list);
    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    handleCreateHotel,
    getAllHotels,
    getHotel,
    handleUpdateHotel,
    handleDeleteHotel,
    countByCity,
    countByType,
    getHotelRooms
};
