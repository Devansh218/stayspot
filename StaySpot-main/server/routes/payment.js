const express = require("express");
const { createPaymentIntent } = require("../controllers/paymentController.js");
const { verifyUser } = require("../utils/verifyToken.js");

const router = express.Router();
router.post("/create-payment-intent", verifyUser, createPaymentIntent);

module.exports = router;