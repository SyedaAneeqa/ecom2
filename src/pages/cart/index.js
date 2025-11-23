// 'use client';
// import React, { useContext, useState } from "react";
// import { CartContext } from "@/utils/ContextReducer";
// import { OrdersContext } from "@/utils/OrdersContext";
// import { useRouter } from "next/navigation";

// export default function Cart() {
//   const { state, dispatch } = useContext(CartContext);
//   const { addOrder } = useContext(OrdersContext);
//   const router = useRouter();

//   const [checkoutOpen, setCheckoutOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     address: '',
//     phone: ''
//   });
//   const [orderPlaced, setOrderPlaced] = useState(false);

//   if ((!state.cart || state.cart.length === 0) && !orderPlaced) {
//     return <h2 className="text-center mt-8 text-xl">Your cart is empty.</h2>;
//   }

//   const handleQuantityChange = (item, newQuantity) => {
//     if (newQuantity < 1) return;
//     dispatch({
//       type: "UPDATE",
//       payload: {
//         tempId: item.tempId,
//         quantity: newQuantity,
//         price: (item.price / item.quantity) * newQuantity,
//       },
//     });
//   };

//   const handleRemove = (item) => {
//     dispatch({ type: "REMOVE", payload: item.tempId });
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleConfirmOrder = (e) => {
//     e.preventDefault();

//     const order = {
//       id: Date.now(),
//       userInfo: { ...formData },
//       products: [...state.cart],
//       total: state.cart.reduce((sum, item) => sum + item.price, 0),
//       date: new Date().toLocaleString(),
//     };

//     addOrder(order);
//     setOrderPlaced(true);
//     setCheckoutOpen(false);
//     dispatch({ type: "CLEAR" });

//     router.push("/orders");
//   };

//   if (orderPlaced) {
//     return (
//       <div className="text-center mt-16">
//         <h2 className="text-3xl font-bold mb-4">Your order has been placed!</h2>
//         <p>Thank you for shopping with us.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>

//       <div className="grid gap-6">
//         {state.cart.map((item) => (
//           <div key={item.tempId} className="flex justify-between items-center border p-4 rounded-lg">
//             <img src={item.img} alt={item.name} className="w-24 h-24 object-cover rounded" />
//             <div className="flex-1 px-4">
//               <h2 className="text-xl font-bold">{item.name}</h2>
//               <p>Size: {item.size}</p>
//               <p>Quantity: {item.quantity}</p>
//               <p>Price: Rs {item.price.toFixed(2)}</p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="number"
//                 min="1"
//                 value={item.quantity}
//                 className="w-16 p-1 border rounded text-center"
//                 onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
//               />
//               <button
//                 onClick={() => handleRemove(item)}
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <h2 className="text-right text-2xl font-bold mt-6">
//         Total: Rs {state.cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
//       </h2>

//       {!checkoutOpen && (
//         <div className="text-right mt-4">
//           <button
//             onClick={() => setCheckoutOpen(true)}
//             className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
//           >
//             Checkout
//           </button>
//         </div>
//       )}

//       {checkoutOpen && (
//         <form
//           onSubmit={handleConfirmOrder}
//           className="max-w-lg mx-auto mt-6 p-4 border rounded shadow-md bg-gray-50"
//         >
//           <h2 className="text-2xl font-bold mb-4">Enter your information</h2>
          
//           <label className="block mb-2">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full p-2 mb-4 border rounded"
//           />

//           <label className="block mb-2">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full p-2 mb-4 border rounded"
//           />

//           <label className="block mb-2">Home Address</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//             className="w-full p-2 mb-4 border rounded"
//           />

//           <label className="block mb-2">Phone Number</label>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//             className="w-full p-2 mb-4 border rounded"
//           />

//           <div className="flex justify-between mt-4">
//             <button
//               type="button"
//               onClick={() => setCheckoutOpen(false)}
//               className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Confirm Order
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }


// 'use client';
// import React, { useContext, useState } from "react";
// import { CartContext } from "@/utils/ContextReducer";
// import { OrdersContext } from "@/utils/OrdersContext";
// import { useRouter } from "next/navigation";

// export default function Cart() {
//   const { state, dispatch } = useContext(CartContext);
//   const { addOrder } = useContext(OrdersContext);
//   const router = useRouter();

//   const [checkoutOpen, setCheckoutOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     address: '',
//     phone: ''
//   });
//   const [orderPlaced, setOrderPlaced] = useState(false);

//   // 💡 IMPROVED CHECK: Handle Order Placed or Empty Cart first
//   if (orderPlaced) {
//     return (
//       <div className="text-center mt-16">
//         <h2 className="text-3xl font-bold mb-4">Your order has been placed!</h2>
//         <p>Thank you for shopping with us.</p>
//         <button onClick={() => router.push('/orders')} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">View Orders</button>
//       </div>
//     );
//   }

//   if (!state.cart || state.cart.length === 0) {
//     return <h2 className="text-center mt-8 text-xl">Your cart is empty.</h2>;
//   }
//   // --- END OF IMPROVED CHECK ---

//   const handleQuantityChange = (item, newQuantity) => {
//     if (newQuantity < 1) return;
    
//     // 💡 FIX: Recalculate price accurately based on unit price
//     const unitPrice = item.price / item.quantity;
//     const newTotalPrice = unitPrice * newQuantity;
    
//     dispatch({
//       type: "UPDATE",
//       payload: {
//         tempId: item.tempId,
//         quantity: newQuantity,
//         price: newTotalPrice, // Use the new, accurate total price
//       },
//     });
//   };

//   const handleRemove = (item) => {
//     dispatch({ type: "REMOVE", payload: item.tempId });
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleConfirmOrder = (e) => {
//     e.preventDefault();

//     const order = {
//       id: Date.now(),
//       userInfo: { ...formData },
//       products: [...state.cart],
//       total: state.cart.reduce((sum, item) => sum + item.price, 0),
//       date: new Date().toLocaleString(),
//     };

//     addOrder(order);
//     setOrderPlaced(true);
//     setCheckoutOpen(false);
//     dispatch({ type: "CLEAR" });

//     // router.push("/orders"); // Removed this line, letting the orderPlaced state handle the redirect/display
//   };
 
//   // 💡 Removed the duplicate if (orderPlaced) block here

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>

//       <div className="grid gap-6">
//         {state.cart.map((item) => (
//           <div key={item.tempId} className="flex justify-between items-center border p-4 rounded-lg">
//             <img src={item.img} alt={item.name} className="w-24 h-24 object-cover rounded" />
//             <div className="flex-1 px-4">
//               <h2 className="text-xl font-bold">{item.name}</h2>
//               <p>Size: {item.size}</p>
//               <p>Quantity: {item.quantity}</p>
//               {/* 💡 EDIT: Standardized price display */}
//               <p>Price: Rs {item.price.toFixed(2)}</p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="number"
//                 min="1"
//                 value={item.quantity}
//                 className="w-16 p-1 border rounded text-center"
//                 onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
//               />
//               <button
//                 onClick={() => handleRemove(item)}
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <h2 className="text-right text-2xl font-bold mt-6">
//         Total: Rs {state.cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
//       </h2>

//       {!checkoutOpen && (
//         <div className="text-right mt-4">
//           <button
//             onClick={() => setCheckoutOpen(true)}
//             className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
//           >
//             Checkout
//           </button>
//         </div>
//       )}

//       {checkoutOpen && (
//         <form
//           onSubmit={handleConfirmOrder}
//           className="max-w-lg mx-auto mt-6 p-4 border rounded shadow-md bg-gray-50"
//         >
//           <h2 className="text-2xl font-bold mb-4">Enter your information</h2>

//           <label className="block mb-2">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full p-2 mb-4 border rounded"
//           />

//           <label className="block mb-2">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full p-2 mb-4 border rounded"
//           />

//           <label className="block mb-2">Home Address</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//             className="w-full p-2 mb-4 border rounded"
//           />

//           <label className="block mb-2">Phone Number</label>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//             className="w-full p-2 mb-4 border rounded"
//           />

//           <div className="flex justify-between mt-4">
//             <button
//               type="button"
//               onClick={() => setCheckoutOpen(false)}
//               className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Confirm Order
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }
'use client';
import React, { useContext, useState } from "react";
import { CartContext } from "@/utils/ContextReducer";
import { OrdersContext } from "@/utils/OrdersContext";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { state, dispatch } = useContext(CartContext);
  const { addOrder } = useContext(OrdersContext);
  const router = useRouter();

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  // 💡 IMPROVED CHECK: Handle Order Placed or Empty Cart first
  if (orderPlaced) {
    return (
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold mb-4">Your order has been placed!</h2>
        <p>Thank you for shopping with us.</p>
        <button onClick={() => router.push('/orders')} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">View Orders</button>
      </div>
    );
  }

  if (!state.cart || state.cart.length === 0) {
    return <h2 className="text-center mt-8 text-xl">Your cart is empty.</h2>;
  }
  // --- END OF IMPROVED CHECK ---

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    
    // 💡 FIX: Recalculate price accurately based on unit price
    const unitPrice = item.price / item.quantity;
    const newTotalPrice = unitPrice * newQuantity;
    
    dispatch({
      type: "UPDATE",
      payload: {
        tempId: item.tempId,
        quantity: newQuantity,
        price: newTotalPrice, // Use the new, accurate total price
      },
    });
  };

  const handleRemove = (item) => {
    dispatch({ type: "REMOVE", payload: item.tempId });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -----------------------------------------------------------
  // 💡 EDITED: Order Confirmation (Now sends data to MongoDB API)
  // -----------------------------------------------------------
  const handleConfirmOrder = async (e) => {
    e.preventDefault();

    // Calculate total amount from the cart state
    const totalAmount = state.cart.reduce((sum, item) => sum + item.price, 0);

    const orderPayload = {
      userInfo: { ...formData },
      products: [...state.cart], // Send all cart items
      total: totalAmount,
    };

    try {
        // Send the order data to the API endpoint
        const response = await fetch('/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderPayload),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || 'Failed to process payment/place order on the server.');
        }

        // Successfully placed order in DB. Now update local context/state.
        
        // 💡 Use the _id returned from MongoDB for the local context
        addOrder({ 
            // The unique ID is now the MongoDB ID
            id: result.data._id, 
            userInfo: orderPayload.userInfo,
            products: orderPayload.products,
            total: orderPayload.total,
            date: new Date().toLocaleString(), // Use current client time for local display
        });

        // Clear the cart and update status
        dispatch({ type: "CLEAR" });
        setOrderPlaced(true);
        setCheckoutOpen(false);

    } catch (error) {
        console.error("Order Confirmation Failed:", error);
        alert(`Order could not be placed. Please try again. Error: ${error.message}`);
    }
  };
  // -----------------------------------------------------------

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>

      <div className="grid gap-6">
        {state.cart.map((item) => (
          <div key={item.tempId} className="flex justify-between items-center border p-4 rounded-lg">
            <img src={item.img} alt={item.name} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1 px-4">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p>Size: {item.size}</p>
              <p>Quantity: {item.quantity}</p>
              {/* 💡 EDIT: Standardized price display */}
              <p>Price: Rs {item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                value={item.quantity}
                className="w-16 p-1 border rounded text-center"
                onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
              />
              <button
                onClick={() => handleRemove(item)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-right text-2xl font-bold mt-6">
        Total: Rs {state.cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
      </h2>

      {!checkoutOpen && (
        <div className="text-right mt-4">
          <button
            onClick={() => setCheckoutOpen(true)}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Checkout
          </button>
        </div>
      )}

      {checkoutOpen && (
        <form
          onSubmit={handleConfirmOrder}
          className="max-w-lg mx-auto mt-6 p-4 border rounded shadow-md bg-gray-50"
        >
          <h2 className="text-2xl font-bold mb-4">Enter your information</h2>

          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border rounded"
          />

          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border rounded"
          />

          <label className="block mb-2">Home Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border rounded"
          />

          <label className="block mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border rounded"
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setCheckoutOpen(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Confirm Order
            </button>
          </div>
        </form>
      )}
    </div>
  );
}