"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/Button";

type CartItem = {
    id: number;
    title: string;
    price: number;
    image: string;
};

type CartProps = {
    cartItems: CartItem[];
    removeFromCart: (id: number) => void;
};

const Cart: React.FC<CartProps> = ({ cartItems, removeFromCart }) => {
    const router = useRouter();

    const handleCheckout = () => {
        // Redirect to checkout page
        router.push('/checkout');
    };

    return (
        <div className="p-12">
            <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul className="space-y-4">
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex items-center justify-between border-b pb-4">
                                <div className="flex items-center">
                                    <img src={item.image} alt={item.title} className="h-16 w-16 object-contain mr-4" />
                                    <div>
                                        <h2 className="font-semibold">{item.title}</h2>
                                        <p>${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <Button 
                                    onClick={() => removeFromCart(item.id)} 
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md"
                                >
                                    Remove
                                </Button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6">
                        <Button 
                            onClick={handleCheckout} 
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;