const Payments = require("../models/paymentModel");
const Users = require("../models/userModel");
const Products = require("../models/productModel");

const paymentController = {
  getAllPayments: async (req, res) => {
    try {
      const payments = await Payments.find();
      res.json(payments);
    } catch (error) {
      return res.status(500).json({ status: false, msg: error.message });
    }
  },
  createPayment: async(req, res) => {
    try {
        const user = await Users.findById(req.user.id).select('name email')
        if(!user) return res.status(400).json({msg: "User does not exist."})

        const {cart, paymentID, address} = req.body;

        const {_id, name, email} = user;

        const newPayment = new Payments({
            user_id: _id, name, email, cart, paymentID, address
        })

        cart.filter(item => {
            return soldProducts(item._id, item.quantity, item.sold)
        })

        await newPayment.save()
        res.json({msg: "Payment Succes!"})
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
};

const soldProducts = async (idProduct,quantity,oldSold) => {
  await Products.findOneAndUpdate({_id:idProduct},{
    sold : quantity + oldSold
  });
}

module.exports = paymentController;
