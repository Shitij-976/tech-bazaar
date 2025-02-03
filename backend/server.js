const express = require("express");
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require("./config/db");
const fs = require('fs')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require ('./routes/userRoutes')
const cartRoutes = require('./routes/cartRoutes')

//mongodb connection
connectDB();
//dot config
dotenv.config();
//middlewares
app.use(express.json());
// Cors
app.use(cors({
    origin: "http://localhost:5173",
    methods:"POST,GET,PATCH,PUT,DELETE,HEAD",
    credentials: true,
}));

// Routes
app.use('/api/user',userRoutes)
app.use('/api/products', productRoutes);
app.use('/api/cart',cartRoutes)

//port
const PORT = process.env.PORT || 8000;
//listen
app.listen(PORT, () => {
    console.log(`Node server is running on: http://localhost:${PORT}`);
});