const Category = require('../models/categoryModel')
const Products = require('../models/productModel')

const categoryController = {
    getCategories: async (req,res) => {
        try {
            const categories = await Category.find();
            res.json({categories: categories})
        } catch (error) {
            return res.status(500).json({status: false, msg: error.message})
        }
    },
    createCategory: async (req, res) => {
        try {
            // Admin all access -> Create,Delete,Update -> Only Admin
            // USer only read 
            let {name} = req.body;
            name = name.toLowerCase();

            const category = await Category.findOne({name: name});
            if(category) return res.status(400).json({status: false, msg: "Category already exists"});

            const newCategory = new Category({name: name});

            await newCategory.save();

            return res.status(200).json({status: true, msg: "Add category successfully !! Hihi"});

        } catch (error) {
            return res.status(500).json({status: false, msg: error.message})
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const products = await Products.findOne({category: req.params.id})
            if(products) return res.status(400).json({status: false, msg:"Warning: Category have products. Please delete products first !"})
            await Category.findByIdAndDelete(req.params.id);
            res.json("Delete success");
        } catch (error) {
            return res.status(500).json({status: false, msg: error.message })
        }
    },
    updateCategory: async (req, res) => {
        try {
            const {name} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id},{name: name});

            res.json("Updated Complete");
        } catch (error) {
            return res.status(500).json({status: false, msg: error.message })
        }
    }
}

module.exports = categoryController; 