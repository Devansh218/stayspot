const express = require("express");
const router = express.Router();

const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
} = require("../controllers/hotelControllers");

// Special count routes MUST be above /:id or general routes
router.get("/countByCity", countByCity);
router.get("/countbycity", countByCity);

router.get("/countByType", countByType);
router.get("/countbytype", countByType);

router.get("/find/:id", getHotel);
router.get("/", getHotels);

router.post("/", createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);

module.exports = router;