const Hotel = require("../models/hotels");
const Room = require("../models/rooms");

const { v4: uuidv4 } = require("uuid");

const handleCreateRoom = async (req, res) => {
    const hotelid = req.params.hotelid;
    const newRoom = await new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelid, {
                $push: { rooms: savedRoom._id },
            });
        } catch (error) {
            res.json(error);
        }
        res.status(201).json(savedRoom);
    } catch (err) {
        res.status(500).json(err);
    }
};

const handleUpdateRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(room);
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateRoomAvailability = async (req, res) => {
    try {

        await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates 
                },
            },
            { new: true, runValidators: false }
        );
        res.json({ message: "Room updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        res.json(room);
    } catch (err) {
        res.status(500).json(err);
    }
};

const handleDeleteRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        res.json({ message: "Room deletted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    handleCreateRoom,
    getAllRooms,
    getRoom,
    handleUpdateRoom,
    handleDeleteRoom,
    updateRoomAvailability,
};
