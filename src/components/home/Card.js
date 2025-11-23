// 'use client';

// import Image from "next/image";
// import { CartContext } from "@/utils/ContextReducer";
// import React, { useContext, useEffect, useState } from "react";
// import Link from "next/link";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { Heart } from "lucide-react";

// function Card({ foodData }) {
//   const data = foodData;
//   const { state, dispatch } = useContext(CartContext);
//   const router = useRouter();
//   const { isSignedIn } = useUser();
  
//   // Get available sizes from the new structure (or default list)
//   const sizeOptions = data.availableSizes || ["s", "m", "l", "xl"];

//   // 💡 EDITED: Initialize selectedSize from the new sizeOptions array
//   const [selectedSize, setSelectedSize] = useState(sizeOptions[0] || "");
//   const [quantity, setQuantity] = useState(1);

//   // 💡 DELETED: The old useEffect relying on data.sizes is removed.

//   // 💡 EDITED: Price calculation uses the single retailPrice
//   const finalPrice = data.retailPrice
//     ? parseFloat(data.retailPrice) * quantity
//     : 0;

//   // Handle Add to Cart
//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     e.preventDefault();

//     if (!isSignedIn) {
//       alert("Please login first!");
//       router.push("/login");
//       return;
//     }

//     if (!selectedSize) {
//         alert("Please select a size.");
//         return;
//     }

//     let existingItem = state.cart.find(
//       (item) => item.id === data.id && item.size === selectedSize
//     );

//     if (existingItem) {
//       dispatch({
//         type: "UPDATE",
//         payload: {
//           tempId: existingItem.tempId,
//           quantity: existingItem.quantity + quantity,
//           price: existingItem.price + finalPrice, // Correct as finalPrice is calculated based on unit retailPrice * quantity
//         },
//       });
//     } else {
//       const itemToAdd = {
//         id: data.id,
//         tempId: data.id + selectedSize,
//         name: data.name,
//         size: selectedSize,
//         quantity: quantity,
//         price: finalPrice, // retailPrice * quantity
//         img: data.img,
//         description: data.description,
//       };
//       dispatch({ type: "ADD_TO_CART", payload: itemToAdd });
//     }
//   };

//   // Handle Wishlist (No changes needed)
//   const handleWishlist = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!isSignedIn) {
//       alert("Please login first to add items to your wishlist!");
//       router.push("/login");
//       return;
//     }

//     const alreadyInWishlist = state.wishlist?.some(
//       (item) => item.id === foodData.id
//     );

//     if (alreadyInWishlist) {
//       dispatch({ type: "REMOVE_FROM_WISHLIST", payload: foodData.id });
//     } else {
//       dispatch({ type: "ADD_TO_WISHLIST", payload: foodData });
//     }
//   };

//   if (!data) return null;

//   return (
//     // 💡 UI FIX: Removed 'relative' from the main div. 
//     // This allows the card's height to be calculated correctly in a grid/flex layout, 
//     // preventing children (like the selectors) from flowing outside.
//     <div className="w-full max-w-xs sm:max-w-sm rounded-lg bg-white overflow-hidden dark:bg-black border-gradient m-4">
//       {/* Wishlist Icon */}
//       <button
//         onClick={handleWishlist}
//         className="absolute top-2 right-2 p-2 rounded-full bg-white shadow hover:scale-110 z-10"
//       >
//         <Heart
//           className={`w-6 h-6 ${
//             state.wishlist?.some((item) => item.id === foodData.id)
//               ? "text-red-500 fill-red-500"
//               : "text-gray-500"
//           }`}
//         />
//       </button>

//       {/* Product card (Link) */}
//       <Link href={{ pathname: "/item/[item]" }} as={`/item/${data.id}`}>
//         <div className="relative w-full h-80 cursor-pointer">
//           {data.img && (
//             <Image
//               src={data.img}
//               layout="fill"
//               objectFit="cover"
//               alt={data.name || "item"}
//             />
//           )}
//         </div>
//         <div className="p-4 cursor-pointer">
//           <div className="font-bold mb-2 text-xl uppercase">{data.name}</div>
//           <p
//             className="text-gray-700 dark:text-gray-400 text-base"
//             style={{
//               display: "-webkit-box",
//               WebkitLineClamp: "1",
//               WebkitBoxOrient: "vertical",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//             }}
//           >
//             {data.description}
//           </p>
//         </div>
//       </Link>

//       {/* Quantity & Size selectors */}
//       <div className="flex px-4 justify-between mt-2">
//         <select
//           className="h-10 p-1 text-black font-semibold cursor-pointer dark:text-gray-300 border border-black dark:border-gray-400 rounded"
//           value={quantity}
//           onChange={(e) => setQuantity(parseInt(e.target.value))}
//           onClick={(e) => {
//             e.stopPropagation();
//             e.preventDefault();
//           }}
//         >
//           {Array.from(Array(6), (_, i) => (
//             <option key={i + 1} value={i + 1}>
//               {i + 1}
//             </option>
//           ))}
//         </select>

//         {/* 💡 EDITED: Selector uses new sizeOptions array */}
//         <select
//           className="h-10 p-1 text-black font-semibold cursor-pointer dark:text-gray-300 border border-black dark:border-gray-400 rounded"
//           value={selectedSize}
//           onChange={(e) => setSelectedSize(e.target.value)}
//           onClick={(e) => {
//             e.stopPropagation();
//             e.preventDefault();
//           }}
//         >
//           {sizeOptions.length > 0 ? (
//             sizeOptions.map((optionKey) => (
//               <option className="uppercase" key={optionKey} value={optionKey}>
//                 {optionKey}
//               </option>
//             ))
//           ) : (
//             <option disabled>No sizes available</option>
//           )}
//         </select>
//       </div>

//       {/* Add to cart button */}
//       <div className="flex p-4 font-bold justify-between items-center">
//         <button
//           className="border dark:border-gray-400 border-gray-900 rounded p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100"
//           onClick={handleAddToCart}
//           disabled={!selectedSize}
//         >
//           Add to cart
//         </button>
//         <p className="p-2 text-xl">Rs {finalPrice.toFixed(2)}</p>
//       </div>
//     </div>
//   );
// }

// export default Card;
'use client';

import Image from "next/image";
import { CartContext } from "@/utils/ContextReducer";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

function Card({ foodData }) {
  const data = foodData;
  const { state, dispatch } = useContext(CartContext);
  const router = useRouter();

  // ✅ Replaced Clerk with localStorage JWT check
  const isSignedIn =
    typeof window !== "undefined" && localStorage.getItem("token");

  if (!data) return null;

  const sizeOptions = data.availableSizes || ["s", "m", "l", "xl"];
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0] || "");
  const [quantity, setQuantity] = useState(1);

  const finalPrice = data.retailPrice
    ? parseFloat(data.retailPrice) * quantity
    : 0;

  // ✅ Add to cart logic
  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isSignedIn) {
      alert("Please login first!");
      router.push("/login");
      return;
    }

    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    const existingItem = state.cart.find(
      (item) => item.id === data.id && item.size === selectedSize
    );

    if (existingItem) {
      dispatch({
        type: "UPDATE",
        payload: {
          tempId: existingItem.tempId,
          quantity: existingItem.quantity + quantity,
          price: existingItem.price + finalPrice,
        },
      });
    } else {
      const itemToAdd = {
        id: data.id,
        tempId: data.id + selectedSize,
        name: data.name,
        size: selectedSize,
        quantity: quantity,
        price: finalPrice,
        img: data.img,
        description: data.description,
      };
      dispatch({ type: "ADD_TO_CART", payload: itemToAdd });
    }
  };

  // ✅ Wishlist logic
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn) {
      alert("Please login first to add items to your wishlist!");
      router.push("/login");
      return;
    }

    const alreadyInWishlist = state.wishlist?.some(
      (item) => item.id === foodData.id
    );

    if (alreadyInWishlist) {
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: foodData.id });
    } else {
      dispatch({ type: "ADD_TO_WISHLIST", payload: foodData });
    }
  };

  return (
    <div className="w-full max-w-xs sm:max-w-sm rounded-lg bg-white overflow-hidden dark:bg-black border-gradient m-4 relative">
      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="absolute top-2 right-2 p-2 rounded-full bg-white shadow hover:scale-110 z-10"
      >
        <Heart
          className={`w-6 h-6 ${
            state.wishlist?.some((item) => item.id === foodData.id)
              ? "text-red-500 fill-red-500"
              : "text-gray-500"
          }`}
        />
      </button>

      {/* Product Card */}
      <Link href={{ pathname: "/item/[item]" }} as={`/item/${data.id}`}>
        <div className="relative w-full h-80 cursor-pointer">
          {data.img && (
            <Image
              src={data.img}
              layout="fill"
              objectFit="cover"
              alt={data.name || "item"}
            />
          )}
        </div>
        <div className="p-4 cursor-pointer">
          <div className="font-bold mb-2 text-xl uppercase">{data.name}</div>
          <p
            className="text-gray-700 dark:text-gray-400 text-base"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {data.description}
          </p>
        </div>
      </Link>

      {/* Quantity and Size Selectors */}
      <div className="flex px-4 justify-between mt-2">
        <select
          className="h-10 p-1 text-black font-semibold cursor-pointer dark:text-gray-300 border border-black dark:border-gray-400 rounded"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          {Array.from(Array(6), (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <select
          className="h-10 p-1 text-black font-semibold cursor-pointer dark:text-gray-300 border border-black dark:border-gray-400 rounded"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          {sizeOptions.length > 0 ? (
            sizeOptions.map((optionKey) => (
              <option className="uppercase" key={optionKey} value={optionKey}>
                {optionKey}
              </option>
            ))
          ) : (
            <option disabled>No sizes available</option>
          )}
        </select>
      </div>

      {/* Add to Cart Button */}
      <div className="flex p-4 font-bold justify-between items-center">
        <button
          className="border dark:border-gray-400 border-gray-900 rounded p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100"
          onClick={handleAddToCart}
          disabled={!selectedSize}
        >
          Add to cart
        </button>
        <p className="p-2 text-xl">Rs {finalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Card;
// 'use client';

// import Image from "next/image";
// import { CartContext } from "@/utils/ContextReducer";
// import React, { useContext, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Heart } from "lucide-react";

// function Card({ foodData }) {
// const data = foodData;
// const { state, dispatch } = useContext(CartContext);
// const router = useRouter();

// const isSignedIn = typeof window !== "undefined" && localStorage.getItem("token");

// if (!data) return null;

// const sizeOptions = data.availableSizes || ["s", "m", "l", "xl"];
// const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);
// const [quantity, setQuantity] = useState(1);

// const discountedPrice =
// data.discountPercentage && data.discountPercentage > 0
// ? data.retailPrice * (1 - data.discountPercentage / 100)
// : data.retailPrice;

// const finalPrice = discountedPrice ? discountedPrice * quantity : 0;

// const handleAddToCart = (e) => {
// e.preventDefault();
// e.stopPropagation();

// ```
// if (!isSignedIn) {
//   alert("Please login first!");
//   router.push("/login");
//   return;
// }

// if (!selectedSize) {
//   alert("Please select a size.");
//   return;
// }

// const existingItem = state.cart.find(
//   (item) => item.id === data.id && item.size === selectedSize
// );

// if (existingItem) {
//   dispatch({
//     type: "UPDATE",
//     payload: {
//       tempId: existingItem.tempId,
//       quantity: existingItem.quantity + quantity,
//       price: existingItem.price + finalPrice,
//     },
//   });
// } else {
//   dispatch({
//     type: "ADD_TO_CART",
//     payload: {
//       id: data.id,
//       tempId: data.id + selectedSize,
//       name: data.name,
//       size: selectedSize,
//       quantity: quantity,
//       price: finalPrice,
//       img: data.img,
//       description: data.description,
//     },
//   });
// }
// ```

// };

// const handleWishlist = (e) => {
// e.preventDefault();
// e.stopPropagation();

// ```
// if (!isSignedIn) {
//   alert("Please login first to add items to your wishlist!");
//   router.push("/login");
//   return;
// }

// const alreadyInWishlist = state.wishlist?.some((item) => item.id === data.id);

// dispatch({
//   type: alreadyInWishlist ? "REMOVE_FROM_WISHLIST" : "ADD_TO_WISHLIST",
//   payload: alreadyInWishlist ? data.id : data,
// });
// ```

// };

// return ( <div className="w-full max-w-xs sm:max-w-sm rounded-lg bg-white dark:bg-black overflow-hidden border-gradient m-4 relative">
// {/* Wishlist Button */} <button
//      onClick={handleWishlist}
//      className="absolute top-2 right-2 p-2 rounded-full bg-white shadow hover:scale-110 z-10"
//    >
// <Heart
// className={`w-6 h-6 ${
//             state.wishlist?.some((item) => item.id === data.id)
//               ? "text-red-500 fill-red-500"
//               : "text-gray-500"
//           }`}
// /> </button>

// ```
//   {/* Discount Badge */}
//   {data.discountPercentage > 0 && (
//     <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
//       {data.discountPercentage}% OFF
//     </span>
//   )}

//   {/* Product Card */}
//   <Link href={{ pathname: "/item/[item]" }} as={`/item/${data.id}`}>
//     <div className="relative w-full h-80 cursor-pointer">
//       {data.img && (
//         <Image
//           src={data.img}
//           layout="fill"
//           objectFit="cover"
//           alt={data.name || "item"}
//         />
//       )}
//     </div>
//     <div className="p-4 cursor-pointer">
//       <div className="font-bold mb-2 text-xl uppercase">{data.name}</div>
//       <p
//         className="text-gray-700 dark:text-gray-400 text-base"
//         style={{
//           display: "-webkit-box",
//           WebkitLineClamp: 1,
//           WebkitBoxOrient: "vertical",
//           overflow: "hidden",
//           textOverflow: "ellipsis",
//         }}
//       >
//         {data.description}
//       </p>

//       {/* Price Display */}
//       <div className="mt-2">
//         {data.discountPercentage > 0 ? (
//           <div className="flex items-center space-x-2">
//             <p className="line-through text-gray-400">
//               Rs {data.retailPrice.toFixed(2)}
//             </p>
//             <p className="text-red-600 font-bold">
//               Rs {discountedPrice.toFixed(2)}
//             </p>
//           </div>
//         ) : (
//           <p className="font-bold">Rs {data.retailPrice?.toFixed(2)}</p>
//         )}
//       </div>
//     </div>
//   </Link>

//   {/* Quantity & Size Selectors */}
//   <div className="flex px-4 justify-between mt-2">
//     <select
//       value={quantity}
//       onChange={(e) => setQuantity(parseInt(e.target.value))}
//       className="h-10 p-1 text-black font-semibold cursor-pointer dark:text-gray-300 border border-black dark:border-gray-400 rounded"
//     >
//       {Array.from({ length: 6 }, (_, i) => (
//         <option key={i + 1} value={i + 1}>
//           {i + 1}
//         </option>
//       ))}
//     </select>

//     <select
//       value={selectedSize}
//       onChange={(e) => setSelectedSize(e.target.value)}
//       className="h-10 p-1 text-black font-semibold cursor-pointer dark:text-gray-300 border border-black dark:border-gray-400 rounded"
//     >
//       {sizeOptions.map((size) => (
//         <option key={size} value={size} className="uppercase">
//           {size}
//         </option>
//       ))}
//     </select>
//   </div>

//   {/* Add to Cart Button & Price */}
//   <div className="flex p-4 font-bold justify-between items-center">
//     <button
//       onClick={handleAddToCart}
//       disabled={!selectedSize}
//       className="border border-gray-900 dark:border-gray-400 rounded p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100 transition"
//     >
//       Add to cart
//     </button>
//     <p className="p-2 text-xl">Rs {finalPrice.toFixed(2)}</p>
//   </div>
// </div>

// );
// }

// export default Card;
