// "use client";

// import React, { useEffect, useState } from 'react';

// type CartItem = {
//   id: number; // Assuming id is an integer
//   product: string;
//   quantity: number;
// };

// const Cart = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       setLoading(true); // Set loading state
//       try {
//         const response = await fetch('/api/cart');
//         if (!response.ok) {
//           throw new Error('Failed to fetch cart items');
//         }
//         const data = await response.json();
//         setCartItems(data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false); // Reset loading state
//       }
//     };

//     fetchCartItems();
//   }, []);

//   const handleRemoveFromCart = async (itemId: number) => {
//     try {
//       const response = await fetch('/api/cart', {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id: itemId }), // Send the item ID to delete
//       });

//       if (response.ok) {
//         // Filter out the removed item from the cartItems state
//         setCartItems(cartItems.filter(item => item.id !== itemId));
//         console.log('Item removed from cart');
//       } else {
//         const errorData = await response.json();
//         console.error('Failed to remove item from cart:', errorData.message);
//         setError(errorData.message); // Set error message
//       }
//     } catch (error) {
//       console.error('Error removing item from cart:', error);
//       setError('Error removing item from cart. Please try again.');
//     }
//   };

//   if (loading) {
//     return <p className="text-gray-700">Loading cart items...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500">{error}</p>;
//   }

  // return (
  //   <div className="container mx-auto px-4 py-10">
  //     <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
  //     {cartItems.length === 0 ? (
  //       <p className="text-gray-700">Your cart is empty.</p>
  //     ) : (
  //       <ul>
  //         {cartItems.map(item => (
  //           <li key={item.id} className="flex justify-between mb-2">
  //             <span>{item.product}</span>
  //             <span>Quantity: {item.quantity}</span>
  //             <button
  //               onClick={() => handleRemoveFromCart(item.id)}
  //               className="text-red-500 hover:text-red-700 ml-4"
  //             >
  //               Remove
  //             </button>
  //           </li>
  //         ))}
  //       </ul>
  //     )}
  //   </div>
  // );
// };

// export default Cart;

const Cart = () => {
  return (
    <div>
      <p className="text-gray-700">&#34;Your cart is empty.&#34;</p>
    </div>
  );
}

export default Cart;