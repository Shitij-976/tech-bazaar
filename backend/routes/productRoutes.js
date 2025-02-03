const express = require("express");
const getAllProducts = require( "../controller/productsController" );


const router = express.Router()

router.get('/',getAllProducts);

module.exports = router
