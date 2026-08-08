const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER USER
const handleCreateUser = async (req, res, next) => {
  try {
    const { username, email, password, isAdmin } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username or Email already exists" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create New User in PostgreSQL via Prisma
    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hash,
        isAdmin: isAdmin || false,
      },
    });

    // Remove password from response
    const { password: userPassword, ...otherDetails } = newUser;

    res.status(201).json(otherDetails);
  } catch (err) {
    next(err);
  }
};

// LOGIN USER
const handleLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find User by Username or Email
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username },
          { email: username }
        ]
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Check Password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong password or username!" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || "jwtsecretkey",
      { expiresIn: "3d" }
    );

    // Exclude password from returned details
    const { password: userPassword, isAdmin, ...otherDetails } = user;

    // Send HTTP-Only Cookie + User Data Response
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  handleCreateUser,
  handleLogin,
};