const express = require("express");
const {getCartItems, addCartItem, removeCartItem} = require("../controller/cartController");


const router = express.Router()

router.post('/', addCartItem);
router.get('/:id', getCartItems);
router.delete('/:userId/item/:productId', removeCartItem);

module.exports = router
