const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const handleCreateUser = async (req, res) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const user = await User.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (user) {
        if (user.username === req.body.username) {
            return res
                .status(400)
                .json({ message: "Username is already taken" });
        }
        if (user.email === req.body.email) {
            return res
                .status(400)
                .json({ message: "Email is already registered" });
        }
    }
    const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        isAdmin: req.body.isAdmin || false,
        password: hash,
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

const handleLogin = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "invalid credentials" });
        }
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET
        );
        const { password, isAdmin, ...otherDetails } = user._doc;



        res.cookie("access_token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        }).status(200).json({ ...otherDetails, isAdmin: isAdmin });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    handleCreateUser,
    handleLogin,
};
