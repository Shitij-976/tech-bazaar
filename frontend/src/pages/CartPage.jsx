import { useCart } from '../context/CartContextProvider';
import { MdDelete } from "react-icons/md";

const CartPage = () => {
    const { cart, removeFromCart } = useCart();

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Your Cart</h1>

            {cart.items.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {cart.items.map((item, index) => (
                        <div key={index} className="bg-white relative p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <img src={item.product.image} alt={item.product.name} className="w-full h-48 object-contain rounded-t-lg mb-4" />
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.product.name}</h2>
                            <p className="text-gray-600 mb-4">{item.product.description}</p>
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-bold text-orange-500">₹{item.product.price}</p>
                                <p className="text-lg text-gray-800">Quantity: {item.quantity}</p>
                            </div>
                            <div className='absolute top-6 right-6 text-red-600 bg-white cursor-pointer border-2 py-1 px-1 rounded-full'
                                onClick={()=>{
                                    removeFromCart(item._id)
                                }}
                            >
                                <MdDelete size={25}/>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">Your cart is empty.</p>
            )}
        </div>
    );
};

export default CartPage;
