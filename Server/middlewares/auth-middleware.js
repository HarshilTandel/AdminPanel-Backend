const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Token not provided." });
  }

  // Assuming token is in the format "Bearer <jwtToken>, removing the "Bearer" prefix"
  const jwtToken = token.replace("Bearer", "").trim();

  try {
    // Verifying the token
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    // Fetching user details from the database, excluding the password field
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    if (!userData) {
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }

    // Assigning token, user data, and user ID to request object
    req.token = token;
    req.user = userData;
    req.userID = userData._id; // Corrected from 'user._id' to 'userData._id'

    // Move on to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;
