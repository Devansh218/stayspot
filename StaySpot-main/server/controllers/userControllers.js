const User = require("../models/user.js");

const handleUpdateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

const handleDeleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.json({ message: "user deletted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { getAllUsers, getUser, handleUpdateUser, handleDeleteUser };
