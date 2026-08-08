const nodemailer = require("nodemailer");

const sendBookingEmail = async (userEmail, bookingDetails) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail App Password
    },
  });

  const mailOptions = {
    from: `"StaySpot Bookings" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Booking Confirmation - StaySpot",
    html: `
      <h2>Thank you for booking with StaySpot!</h2>
      <p>Your reservation is confirmed.</p>
      <p><b>Hotel:</b> ${bookingDetails.hotelName}</p>
      <p><b>Amount Paid:</b> $${bookingDetails.amount}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendBookingEmail;