"use client";

import Image from "next/image";
import { useCart } from '@/context/CartContext';

export default function CartPage() {
    const { cartItems, removeProductFromCart, updateQuantity } = useCart();
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Your Shopping Cart</h1>
            <p>Refresh the page to see the latest products.</p>
            {cartItems.length === 0 ? (
                <>
                <p className="text-gray-500">Your cart is empty.</p>
                <p className="text-gray-500">Please wait as it takes some time to load the products.</p>
                </>   
            ) : (
                <div className="pt-10">
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                                <div className="flex-shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={100}
                                        height={100}
                                        className="object-contain"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h2 className="font-semibold">{item.title}</h2>
                                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="px-3 py-1 bg-grey-200 hover:bg-grey-300 rounded-full"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="px-3 py-1 bg-grey-200 hover:bg-grey-300 rounded-full"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => removeProductFromCart(item.id)}
                                        className="ml-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-right">
                        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
                        <button 
                            className="mt-4 px-3 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded"
                            onClick={() => {}}//TODO: Implement checkout
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}