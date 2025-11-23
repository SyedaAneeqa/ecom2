// "use client";

// import "@/styles/globals.css";
// import { CartProvider } from "@/utils/ContextReducer";
// import { OrdersProvider } from "@/utils/OrdersContext"; // ✅ import OrdersProvider
// import Layout from "@/components/layouts/Layout";


// export default function App({ Component, pageProps }) {
//   return (
//       <OrdersProvider> {/* ✅ Wrap everything that needs access to orders */}
//         <CartProvider>
//           <Layout>
//             <Component {...pageProps} />
//           </Layout>
//         </CartProvider>
//       </OrdersProvider>
//   );
// }
"use client";

import "@/styles/globals.css";
import { CartProvider } from "@/utils/ContextReducer";
import { OrdersProvider } from "@/utils/OrdersContext";
import { AuthProvider } from "@/utils/AuthContext"; // 👈 Import the AuthProvider
import Layout from "@/components/layouts/Layout";


export default function App({ Component, pageProps }) {
  return (
    // Wrap the entire application with AuthProvider.
    // This ensures all components, including your other contexts,
    // have access to the user's logged-in status.
    <AuthProvider>
      <OrdersProvider>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </OrdersProvider>
    </AuthProvider>
  );
}