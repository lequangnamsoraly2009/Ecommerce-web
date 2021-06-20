const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await Users.findOne({ email });

      if (user)
        return res
          .status(400)
          .json({ status: false, msg: "The email already exists" });

      if (password.length < 6) {
        return res.status(400).json({
          status: false,
          msg: "Password is at least 6 characters long",
        });
      }

      // Password Encode - Encryption

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });

      //   Save User Into The DataBase
      await newUser.save();

      // Authentication
      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });
      //Set cookie refresh Token
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });
      res.json({ accesstoken });
    } catch (error) {
      return res.status(500).json({ status: false, msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email: email });
      if (!user)
        return res
          .status(400)
          .json({ status: false, msg: "User does not exist ! " });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ status: false, msg: "Incorrect Password" });

      // If login successful, create access token and refresh token
      // Authentication
      const accesstoken = createAccessToken({ id: user.id });
      const refreshtoken = createRefreshToken({ id: user.id });
      //Set cookie refresh Token
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });
      res.json({ accesstoken });

      // res.json({ msg: "Login success " });
    } catch (error) {
      return res.status(500).json({ status: false, msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      res.json({ status: true, msg: "Logged Out" });
    } catch (error) {
      return res.status(500).json({ status: false, msg: error.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res
          .status(400)
          .json({ status: false, msg: "Please Login or Register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res
            .status(400)
            .json({ status: false, msg: "Please Login or Register" });

        const accesstoken = createAccessToken({ id: user.id });

        res.json({ accesstoken });
      });
    } catch (error) {
      return res.status(500).json({ status: false, msg: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user)
        return res
          .status(400)
          .json({ status: false, msg: "User does not exist" });

      res.json(user);
    } catch (error) {
      return res.status(500).json({ status: false, msg: error.message });
    }
  },
  addCart: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if(!user) return res.status(400).json({status: false, msg:"User does not exist"});

      await Users.findOneAndUpdate({_id: req.user.id},{
        cart: req.body.cart
      })

      return res.json({msg:"Added to cart"});
    } catch (error) {
      return res.status(500).json({ status: false, msg: error.message });
    }
  },
};

const createAccessToken = (user) => {
  // Token expiresIn 1 day
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (user) => {
  // Refresh Token expiresIn 7 day
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userController;
