/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// src/context/CartContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContextProvider';

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [] });
    const { userId } = useContext(UserContext);
    // console.log(userId)

    const fetchCart = async () => {
        // console.log("fetch cart")
        try {
            const response = await axios.get(`http://localhost:8000/api/cart/${userId}`);
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };
    useEffect(() => {
        fetchCart();
    }, [userId]);

    const addToCart = async (productId) => {
        try {
            // console.log("add cart")
            const response = await axios.post('http://localhost:8000/api/cart', { productId, userId });
            setCart(response.data);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            // Sending DELETE request with userId and productId in the URL
            await axios.delete(`http://localhost:8000/api/cart/${userId}/item/${productId}`);
            fetchCart()
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };
    return (
        <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
