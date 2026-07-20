const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const hotelRoute = require("./routes/hotels.js");
const userRoute = require("./routes/users.js");
const authRoute = require("./routes/auth.js");
const roomsRoute = require("./routes/rooms.js");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
    cors({
        origin: ['https://k0ph98fj-5173.inc1.devtunnels.ms', 'http://localhost:8000', process.env.FRONTEND_URL, 'https://api.cloudinary.com/v1_1/dwimsjcof/image/uploads'], // or use '*' to allow all origins
        methods: ["GET", "POST", "PUT", "DELETE", 'OPTIONS'],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "X-Requested-With",
            "Accept",
            "Origin",
        ],
        credentials: true,
    })
);

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected");
    } catch (error) {
        throw error;
    }
};

connectMongo();

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on("disconnected", () => {
    console.log("mongodb disconnected");
});

app.use("/api/hotel", hotelRoute);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/room", roomsRoute);

app.get("/", (req, res) => {
    res.send("Welcome");
});

app.listen("3000", () => console.log("listening on port 3000"));
