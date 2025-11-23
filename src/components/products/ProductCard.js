// "use client";
// import React, { useContext } from "react";
// import { CartContext } from "@/utils/ContextReducer";
// import { useUser } from "@clerk/nextjs";

// export default function ProductCard({ product }) {
//   const { dispatch } = useContext(CartContext);
//   const { isSignedIn } = useUser();

//   const handleAddToCart = () => {
//     if (!isSignedIn) {
//       alert("Please login or signup first");
//       return;
//     }

//     dispatch({
//       type: "ADD",
//       payload: {
//         tempId: Date.now(), // unique id for cart item
//         name: product.name,
//         price: product.price,
//         quantity: 1,
//       },
//     });

//     alert("Item added to cart");
//   };

//   return (
//     <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
//       <h2 className="font-semibold text-lg">{product.name}</h2>
//       <p className="text-gray-600 dark:text-gray-400">${product.price}</p>
//       <button
//         onClick={handleAddToCart}
//         className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// }

'use client';
import React, { useContext } from "react";
import { CartContext } from "@/utils/ContextReducer";

export default function ProductCard({ product }) {
  const { dispatch } = useContext(CartContext);
  const { isSignedIn } = useUser();

  const handleAddToCart = () => {
    if (!isSignedIn) {
      alert("Please login or signup first");
      return;
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        tempId: Date.now(), // unique id for cart item
        name: product.name,
        // 💡 EDIT 1: Use the new retailPrice field for dispatching to cart
        price: product.retailPrice, 
        quantity: 1,
      },
    });

    alert("Item added to cart");
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
      <h2 className="font-semibold text-lg">{product.name}</h2>
      
      {/* 💡 EDIT 2: Use the new retailPrice field for display */}
      <p className="text-gray-600 dark:text-gray-400">Rs {product.retailPrice}</p>
      
      <button
        onClick={handleAddToCart}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
