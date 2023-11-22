const Products = require("../models/product");
const getAllProductsStatic = async (req, res) => {
  const products = await Products.find({ name: "high-back bench" });
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    //The $regex operator in MongoDB is used for pattern matching within queries.
    queryObject.name = { $regex: name };
  }

  console.log(queryObject);
  const products = await Products.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
