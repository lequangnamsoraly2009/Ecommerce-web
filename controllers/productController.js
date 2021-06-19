const Products = require("../models/productModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  sorting() {
      if(this.queryString.sort){
          const sortBy = this.queryString.sort.split(',').join(' ');
          this.query = this.query.sort(sortBy);
      }
      else{
        this.query = this.query.sort('-createdAt');

      }
      return this;
  }
  filtering() {
    const queryObj = { ...this.queryString }; // queryString === req.query
    console.log({ before: queryObj });
    const excludedFields = ["page", "sort", "limit"];
    // Loop exclidedFields -> if element have into queryObj -> delete queryObj[element];
    excludedFields.forEach((element) => delete queryObj[element]);

    console.log({ after: queryObj });

    let queryStr = JSON.stringify(queryObj);

    // gte(>=) gt(>) lte(<=) lt(<)
    // gte : greater than or equal
    // lte : lesser than or equal
    // gt : greater than
    // lt : lesser than
    // regex : filter follow characters :))
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    console.log({ queryStr });
    // Filter here with queryStr then formatted
    // 2 times find :V -> find list products -> find follow formatted
    this.query.find(JSON.parse(queryStr));
    // console.log(this)
    return this;
  }
  paginating() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit *1 || 4;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
      return this;
  }
}

const productController = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query).filtering().sorting().paginating();

      //   console.log(features.query)
      const products = await features.query;
      // console.log(products)
      res.json({ 
          status: 'success',
          result: products.length,
          products : products
      });
    } catch (error) {
      return res.status(500).json({ status: false, msg: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;
      if (!images)
        return res.status(404).json({ status: false, msg: "No image upload" });

      const product = await Products.findOne({ product_id: product_id });

      if (product)
        return res
          .status(400)
          .json({ status: false, msg: "Product already exists" });

      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });
      await newProduct.save();

      res.json({ status: true, msg: "Created Product Success" });
    } catch (error) {
      return res.status(500).json({ status: false, msg: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const product = await Products.findByIdAndDelete({ _id: req.params.id });
      if (!product)
        return res
          .status(400)
          .json({ status: false, msg: "Product not Found" });

      res.json({ status: true, msg: "Deleted Product Success" });
    } catch (error) {
      return res.status(500).json({ status: false, msg: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;

      if (!images)
        return res.status(400).json({ status: false, msg: "No image Found" });

      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
        }
      );

      res.json({ status: true, msg: "Updated Product Success" });
    } catch (error) {
      return res.status(500).json({ status: false, msg: error.message });
    }
  },
};

module.exports = productController;
