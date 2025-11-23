
// 'use client';

// import Image from "next/image";
// import Link from "next/link";
// import { useContext, useEffect, useState } from "react";
// import { CartContext } from "@/utils/ContextReducer";
// import { Heart, ShoppingCart, Package, LayoutDashboard } from "lucide-react";
// import { useRouter } from "next/navigation";

// export default function Navbar() {
//   const router = useRouter();
//   const { state } = useContext(CartContext);
//   const [user, setUser] = useState(null);

//   // ✅ Read user from localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     router.push("/");
//   };

//   const uniqueCartItems = state.cart?.length || 0;
//   const uniqueWishlistItems = state.wishlist?.length || 0;

//   return (
//     <header className="bg-gradient-to-r from-blue-700 via-indigo-800 to-blue-900 shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-4">
//           {/* Left Section - Logo */}
//           <div className="flex items-center space-x-3">
//             <Link href="/">
//               <Image
//                 src="/clothes-filled.svg"
//                 alt="Style Corner Logo"
//                 width={30}
//                 height={30}
//                 className="cursor-pointer"
//               />
//             </Link>
//             <h1 className="text-white text-2xl font-bold tracking-wide">Style Corner</h1>
//           </div>

//           {/* Right Section - Navigation */}
//           <div className="flex items-center space-x-6 text-white text-sm font-medium">
//             {!user ? (
//               <>
//                 <button onClick={() => router.push("/login")} className="hover:text-blue-200">
//                   Login
//                 </button>
//                 <button onClick={() => router.push("/signup")} className="hover:text-blue-200">
//                   Sign Up
//                 </button>
//               </>
//             ) : (
//               <>
//                 {/* Admin view: only logout + admin dashboard */}
//                 {user.isAdmin ? (
//                   <>
//                     <Link href="/admin" className="flex items-center space-x-1 hover:text-blue-200">
//                       <LayoutDashboard size={18} />
//                       <span>Admin Dashboard</span>
//                     </Link>
//                     <button onClick={handleLogout} className="hover:text-blue-200">Logout</button>
//                   </>
//                 ) : (
//                   <>
//                     {/* Regular user: wishlist, cart, orders, logout */}
//                     <span className="text-blue-200 font-semibold">
//                       Welcome, {user.name || "User"}!
//                     </span>

//                     <Link href="/wishlist" className="relative hover:text-blue-200">
//                       <Heart size={18} />
//                       {uniqueWishlistItems > 0 && (
//                         <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                           {uniqueWishlistItems}
//                         </span>
//                       )}
//                     </Link>

//                     <Link href="/cart" className="relative hover:text-blue-200">
//                       <ShoppingCart size={18} />
//                       {uniqueCartItems > 0 && (
//                         <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs rounded-full w-4 h-4 flex items-center justify-center text-black">
//                           {uniqueCartItems}
//                         </span>
//                       )}
//                     </Link>

//                     <Link href="/orders" className="flex items-center space-x-1 hover:text-blue-200">
//                       <Package size={18} />
//                       <span>Orders</span>
//                     </Link>

//                     <button onClick={handleLogout} className="hover:text-blue-200">
//                       Logout
//                     </button>
//                   </>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
'use client';

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/utils/ContextReducer";
import { Heart, ShoppingCart, Package, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/AuthContext"; // ✅ use AuthContext

export default function Navbar() {
  const router = useRouter();
  const { state } = useContext(CartContext);
  const { user, logout } = useAuth(); // ✅ get user + logout from context

  const uniqueCartItems = state.cart?.length || 0;
  const uniqueWishlistItems = state.wishlist?.length || 0;

  const handleLogout = () => {
    logout(); // ✅ clear context + localStorage
    router.push("/");
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 via-indigo-800 to-blue-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Left Section - Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Image
                src="/clothes-filled.svg"
                alt="Style Corner Logo"
                width={30}
                height={30}
                className="cursor-pointer"
              />
            </Link>
            <h1 className="text-white text-2xl font-bold tracking-wide">Style Corner</h1>
          </div>

          {/* Right Section - Navigation */}
          <div className="flex items-center space-x-6 text-white text-sm font-medium">
            {!user ? (
              <>
                <button onClick={() => router.push("/login")} className="hover:text-blue-200">
                  Login
                </button>
                <button onClick={() => router.push("/signup")} className="hover:text-blue-200">
                  Sign Up
                </button>
              </>
            ) : (
              <>
                {/* Admin view */}
                {user.isAdmin ? (
                  <>
                    <Link href="/admin" className="flex items-center space-x-1 hover:text-blue-200">
                      <LayoutDashboard size={18} />
                      <span>Admin Dashboard</span>
                    </Link>
                    <button onClick={handleLogout} className="hover:text-blue-200">Logout</button>
                  </>
                ) : (
                  <>
                    {/* Regular user */}
                    <span className="text-blue-200 font-semibold">
                      Welcome, {user.name || "User"}!
                    </span>

                    <Link href="/wishlist" className="relative hover:text-blue-200">
                      <Heart size={18} />
                      {uniqueWishlistItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          {uniqueWishlistItems}
                        </span>
                      )}
                    </Link>

                    <Link href="/cart" className="relative hover:text-blue-200">
                      <ShoppingCart size={18} />
                      {uniqueCartItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs rounded-full w-4 h-4 flex items-center justify-center text-black">
                          {uniqueCartItems}
                        </span>
                      )}
                    </Link>

                    <Link href="/orders" className="flex items-center space-x-1 hover:text-blue-200">
                      <Package size={18} />
                      <span>Orders</span>
                    </Link>

                    <button onClick={handleLogout} className="hover:text-blue-200">
                      Logout
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

