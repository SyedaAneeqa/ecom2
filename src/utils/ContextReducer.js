// "use client";
// import React, { createContext, useReducer } from "react";

// // Create the context
// export const CartContext = createContext();

// // Reducer function to handle cart + wishlist actions
// const cartReducer = (state, action) => {
//   switch (action.type) {
//     // ---------------- CART ----------------
//     case "ADD_TO_CART":
//       return {
//         ...state,
//         cart: [...state.cart, action.payload],
//       };

//     case "UPDATE":
//       return {
//         ...state,
//         cart: state.cart.map((item) =>
//           item.tempId === action.payload.tempId
//             ? {
//                 ...item,
//                 quantity: action.payload.quantity,
//                 price: action.payload.price,
//               }
//             : item
//         ),
//       };

//     case "REMOVE":
//       return {
//         ...state,
//         cart: state.cart.filter((item) => item.tempId !== action.payload),
//       };

//     case "CLEAR":
//       return {
//         ...state,
//         cart: [],
//       };

//     // ---------------- WISHLIST ----------------
//     case "ADD_TO_WISHLIST":
//       return {
//         ...state,
//         wishlist: [...state.wishlist, action.payload],
//       };

//     case "REMOVE_FROM_WISHLIST":
//       return {
//         ...state,
//         wishlist: state.wishlist.filter((item) => item.id !== action.payload),
//       };

//     case "CLEAR_WISHLIST":
//       return {
//         ...state,
//         wishlist: [],
//       };

//     default:
//       return state;
//   }
// };

// // Context Provider
// export function CartProvider({ children }) {
//   const initialState = {
//     cart: [],
//     wishlist: [],
//   };

//   const [state, dispatch] = useReducer(cartReducer, initialState);

//   return (
//     <CartContext.Provider value={{ state, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// }
"use client";
import React, { createContext, useReducer, useEffect } from "react";

// Create the context
export const CartContext = createContext();

// Reducer function to handle cart + wishlist actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };

    case "UPDATE":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.tempId === action.payload.tempId
            ? { ...item, quantity: action.payload.quantity, price: action.payload.price }
            : item
        ),
      };

    case "REMOVE":
      return { ...state, cart: state.cart.filter((item) => item.tempId !== action.payload) };

    case "CLEAR":
      return { ...state, cart: [] };

    // ---------------- WISHLIST ----------------
    case "ADD_TO_WISHLIST":
      return { ...state, wishlist: [...state.wishlist, action.payload] };

    case "REMOVE_FROM_WISHLIST":
      return { ...state, wishlist: state.wishlist.filter((item) => item.id !== action.payload) };

    case "CLEAR_WISHLIST":
      return { ...state, wishlist: [] };

    // ---------------- SET (load from storage) ----------------
    case "SET_STATE":
      return {
        ...state,
        cart: action.payload.cart || [],
        wishlist: action.payload.wishlist || [],
      };

    default:
      return state;
  }
};

// Context Provider
export function CartProvider({ children }) {
  const initialState = { cart: [], wishlist: [] };
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // ✅ Load saved cart/wishlist for the logged-in user
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser || storedUser === "undefined" || storedUser === "null") return;

      const user = JSON.parse(storedUser);
      if (!user?.id) return;

      const savedData = localStorage.getItem(`cartData_${user.id}`);
      if (savedData && savedData !== "undefined") {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: "SET_STATE", payload: parsedData });
      }
    } catch (err) {
      console.error("⚠️ Failed to parse user/cart data:", err);
      // Clean up invalid data
      localStorage.removeItem("user");
    }
  }, []);

  // ✅ Save cart/wishlist whenever they change
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser || storedUser === "undefined" || storedUser === "null") return;

      const user = JSON.parse(storedUser);
      if (!user?.id) return;

      localStorage.setItem(`cartData_${user.id}`, JSON.stringify(state));
    } catch (err) {
      console.error("⚠️ Failed to save cart data:", err);
    }
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
