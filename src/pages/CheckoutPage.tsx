// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { CartItem, DeliveryAddress, PaymentMethod } from '../types';
// // import { products } from '../data/products';

// export default function CheckoutPage() {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
//   const [address, setAddress] = useState<DeliveryAddress>({
//     fullName: '',
//     street: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     phone: '',
//   });

//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => {
//       const product = products.find(p => p.id === item.productId);
//       return total + (product?.price || 0) * item.quantity;
//     }, 0);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // In a real app, you would send this to your backend
//     const order = {
//       items: cartItems,
//       deliveryAddress: address,
//       paymentMethod,
//       total: calculateTotal() + 10, // Including delivery fee
//     };
    
//     console.log('Order placed:', order);
    
//     // Clear cart
//     localStorage.removeItem('cart');
    
//     // Show success message and redirect
//     alert('Order placed successfully!');
//     navigate('/');
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-2xl font-bold mb-8">Checkout</h1>

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="space-y-6">
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   className="w-full px-3 py-2 border rounded-lg"
//                   value={address.fullName}
//                   onChange={e => setAddress({...address, fullName: e.target.value})}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Street Address
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   className="w-full px-3 py-2 border rounded-lg"
//                   value={address.street}
//                   onChange={e => setAddress({...address, street: e.target.value})}
//                 />
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     City
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     className="w-full px-3 py-2 border rounded-lg"
//                     value={address.city}
//                     onChange={e => setAddress({...address, city: e.target.value})}
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     State
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     className="w-full px-3 py-2 border rounded-lg"
//                     value={address.state}
//                     onChange={e => setAddress({...address, state: e.target.value})}
//                   />
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     ZIP Code
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     className="w-full px-3 py-2 border rounded-lg"
//                     value={address.zipCode}
//                     onChange={e => setAddress({...address, zipCode: e.target.value})}
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Phone
//                   </label>
//                   <input
//                     type="tel"
//                     required
//                     className="w-full px-3 py-2 border rounded-lg"
//                     value={address.phone}
//                     onChange={e => setAddress({...address, phone: e.target.value})}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
//             <div className="space-y-3">
//               <label className="flex items-center space-x-3">
//                 <input
//                   type="radio"
//                   name="payment"
//                   value="cash"
//                   checked={paymentMethod === 'cash'}
//                   onChange={e => setPaymentMethod(e.target.value as PaymentMethod)}
//                   className="h-4 w-4 text-blue-600"
//                 />
//                 <span>Cash on Delivery</span>
//               </label>
              
//               <label className="flex items-center space-x-3">
//                 <input
//                   type="radio"
//                   name="payment"
//                   value="card"
//                   checked={paymentMethod === 'card'}
//                   onChange={e => setPaymentMethod(e.target.value as PaymentMethod)}
//                   className="h-4 w-4 text-blue-600"
//                 />
//                 <span>Card Payment</span>
//               </label>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
//           <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//           <div className="space-y-4">
//             {cartItems.map(item => {
//               const product = products.find(p => p.id === item.productId);
//               if (!product) return null;
              
//               return (
//                 <div key={item.productId} className="flex justify-between">
//                   <span>{product.name} x {item.quantity}</span>
//                   <span>${(product.price * item.quantity).toFixed(2)}</span>
//                 </div>
//               );
//             })}
            
//             <div className="border-t pt-4 space-y-2">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>${calculateTotal().toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Delivery</span>
//                 <span>$10.00</span>
//               </div>
//               <div className="border-t pt-2 font-semibold flex justify-between">
//                 <span>Total</span>
//                 <span>${(calculateTotal() + 10).toFixed(2)}</span>
//               </div>
//             </div>
//           </div>
          
//           <button
//             type="submit"
//             className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
//           >
//             Place Order
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }