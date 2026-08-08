const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/hotel", require("./routes/hotels.js"));
app.use("/api/user", require("./routes/users.js"));
app.use("/api/room", require("./routes/rooms.js"));

app.listen(process.env.PORT || 3000, () => {
  console.log("StaySpot Backend running smoothly on PostgreSQL/Supabase!");
});