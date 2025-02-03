const product_model = require("../models/product_model");

const getAllProducts = async(req,res) => {
    try {
        const { price, category, brand } = req.query;

        const query = {};

        if (price) {
            query.price = { $lte: parseFloat(price) };
        }

        if (category) {
            query.category = category;
        }

        if (brand) {
            query.brand = brand;
        }

        const products = await product_model.find(query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
}

module.exports = getAllProducts;