const productModel = require('../models/productModel');

exports.create = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = await productModel.createProduct(name, description, price, req.userId);
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating product' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const product = await productModel.updateProduct(id, name, description, price);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating product' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.deleteProduct(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};