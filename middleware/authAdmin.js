const Users = require("../models/userModel");

// Middleware check role Admin
const authAdmin = async (req, res, next) => {
  try {
    //Get User Information By Id
    const admin = await Users.findOne({ _id: req.user.id });
    if (admin.role === 0)
      return res
        .status(400)
        .json({ status: false, msg: "Admin Access Denied" });
    next();
  } catch (error) {
    return res.status(500).json({ status: false, msg: error.message });
  }
};

module.exports = authAdmin;
