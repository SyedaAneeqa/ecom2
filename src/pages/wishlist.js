"use client";

import React, { useContext } from "react";
import { CartContext } from "@/utils/ContextReducer";
import Card from "@/components/home/Card";

export default function WishlistPage() {
  const { state } = useContext(CartContext);
  const wishlist = state.wishlist;

  if (!wishlist || wishlist.length === 0)
    return <p className="p-4 text-xl">Your wishlist is empty!</p>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {wishlist.map((item) => (
        <Card key={item.id} foodData={item} />
      ))}
    </div>
  );
}
