
'use client';
import React, { useContext, useEffect, useState } from "react";
import { OrdersContext } from "@/utils/OrdersContext";

export default function Orders() {
  const { orders } = useContext(OrdersContext);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setCurrentUser(parsed);
        console.log("✅ Logged-in user:", parsed);
      } catch (e) {
        console.error("❌ Error parsing stored user:", e);
      }
    }
  }, []);

  if (!currentUser) {
    return (
      <h2 className="text-center mt-8 text-xl">
        Please log in to see your orders.
      </h2>
    );
  }

  // Filter orders for the current user (checks email and id)
  const userOrders = orders.filter(order => {
    const email = order?.userInfo?.email || order?.email || null;
    const id = order?.userInfo?.id || order?.userId || null;

    return (email && email === currentUser.email) || (id && id === currentUser._id);
  });

  if (userOrders.length === 0) {
    return (
      <h2 className="text-center mt-8 text-xl">
        No orders found for your account.
      </h2>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Your Orders</h1>
      <div className="grid gap-6">
        {userOrders.map((order) => (
          <div key={order.id || order._id} className="border p-4 rounded-lg bg-gray-50">
            <h2 className="text-xl font-bold mb-2">
              Order ID: {order.id || order._id}
            </h2>
            <p>Date: {order.date ? new Date(order.date).toLocaleString() : "-"}</p>
            <p>Name: {order.userInfo?.name || order.name}</p>
            <p>Email: {order.userInfo?.email || order.email}</p>
            <p>Address: {order.userInfo?.address || order.address}</p>
            <p>Phone: {order.userInfo?.phone || order.phone}</p>

            <h3 className="font-semibold mt-2 mb-1">Products:</h3>
            <ul className="list-disc list-inside">
              {order.products?.map((item) => (
                <li key={item.tempId || item.id}>
                  {item.name} — Size: {item.size} — Quantity: {item.quantity} — Rs {item.price.toFixed(2)}
                </li>
              ))}
            </ul>

            <p className="font-bold mt-2">
              Total: Rs {order.total?.toFixed(2) || order.totalAmount?.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
