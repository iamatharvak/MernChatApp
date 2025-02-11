const jwt = require("jsonwebtoken");
const User = require("../data/models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
      // console.log("Decoded Token:", decoded);
      // console.log("User Found:", req.user);
    } catch (error) {
      res.status(401);
      throw new Error("not authorized,token failed");
    }
  }
});

module.exports = { protect };
