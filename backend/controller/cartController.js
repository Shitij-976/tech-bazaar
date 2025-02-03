const Cart = require( "../models/cart_model" );
const Product = require( "../models/product_model" );

const getCartItems = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findOne({ userId: id }).populate('items.product');
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart data', error });
    }
};
const addCartItem = async (req, res) => {
    const { productId, userId } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            cart = new Cart({ userId: userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({ product: productId, quantity: 1 });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error });
    }
};

const removeCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        // console.log("DELETE",userId,productId)

        // Find the cart by user ID
        const cart = await Cart.findOne({ userId: userId });
        // console.log("Carts",cart)
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Check if the product exists in the cart
        const productIndex = cart.items.findIndex(item => item._id.toString() === productId);
        // console.log("productIndex",productIndex)
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        // Remove the product from the items array
        cart.items.splice(productIndex, 1);

        // Save the updated cart
        await cart.save();

        return res.status(200).json({ message: "Product removed from cart successfully", cart });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { getCartItems, addCartItem, removeCartItem};