// 'use client';
// import React, { createContext, useState, useEffect } from "react";

// export const OrdersContext = createContext();

// export const OrdersProvider = ({ children }) => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const saved = localStorage.getItem("orders");
//     if (saved) setOrders(JSON.parse(saved));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("orders", JSON.stringify(orders));
//   }, [orders]);

//   const addOrder = (order) => {
//     setOrders([...orders, order]);
//   };

//   return (
//     <OrdersContext.Provider value={{ orders, addOrder }}>
//       {children}
//     </OrdersContext.Provider>
//   );
// };
'use client';
import React, { createContext, useState, useEffect } from "react";

export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("orders");
    if (saved) setOrders(JSON.parse(saved));
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // Add order and attach logged-in user info automatically
  const addOrder = (order) => {
    const storedUser = localStorage.getItem("user");
    const currentUser = storedUser ? JSON.parse(storedUser) : null;

    const orderWithUser = {
      ...order,
      userInfo: currentUser ? {
        id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
        address: currentUser.address || "",
        phone: currentUser.phone || "",
      } : null
    };

    setOrders([...orders, orderWithUser]);
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};
