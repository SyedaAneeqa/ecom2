// // import { useEffect, useState } from "react";
// // import { useUser } from "@clerk/nextjs";
// // import { useRouter } from "next/router";

// // export default function AdminPanel() {
// //   const { user } = useUser();
// //   const router = useRouter();
// //   const [loading, setLoading] = useState(true);
// //   const [isAdmin, setIsAdmin] = useState(false);

// //   useEffect(() => {
// //     if (!user) return;

// //     const checkAdmin = async () => {
// //       try {
// //         const res = await fetch("/api/admin/checkadmin", {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({ email: user.emailAddresses[0].emailAddress }),
// //         });
// //         const data = await res.json();
// //         if (!data.success || !data.isAdmin) {
// //           router.push("/login"); // redirect non-admins
// //         } else {
// //           setIsAdmin(true);
// //         }
// //       } catch (err) {
// //         console.error(err);
// //         router.push("/login");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     checkAdmin();
// //   }, [user]);

// //   if (loading) return <div>Loading...</div>;
// //   if (!isAdmin) return null;

// //   return (
// //     <div className="p-8">
// //       <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
// //       <p>Welcome, admin! You can manage users here.</p>
// //     </div>
// //   );
// // }
// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import AdminGuard from '@/components/admin/AdminGuard';

// export default function AdminDashboard() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await fetch('/api/admin/orders');
//         const data = await res.json();
//         if (data.success) {
//           setOrders(data.orders);
//         }
//       } catch (err) {
//         console.error('Error fetching orders:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <AdminGuard>
//       <div className="min-h-screen bg-gray-100 p-8">
//         <div className="container mx-auto max-w-6xl">
//           <header className="flex justify-between items-center mb-8 border-b pb-4">
//             <h1 className="text-3xl font-bold text-gray-800">🛠️ Admin Dashboard</h1>
//             <Link
//               href="/"
//               className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300 shadow-md"
//             >
//               ← Back to Home
//             </Link>
//           </header>

//           {/* Orders Section */}
//           <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//             <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
//             {loading ? (
//               <p>Loading orders...</p>
//             ) : orders.length === 0 ? (
//               <p>No orders found.</p>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full border border-gray-300">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="border px-4 py-2">Order ID</th>
//                       <th className="border px-4 py-2">Customer</th>
//                       <th className="border px-4 py-2">Email</th>
//                       <th className="border px-4 py-2">Total Amount</th>
//                       <th className="border px-4 py-2">Status</th>
//                       <th className="border px-4 py-2">Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {orders.map((order) => (
//                       <tr key={order._id}>
//                         <td className="border px-4 py-2">{order._id}</td>
//                         <td className="border px-4 py-2">{order.userInfo.name}</td>
//                         <td className="border px-4 py-2">{order.userInfo.email}</td>
//                         <td className="border px-4 py-2">${order.totalAmount.toFixed(2)}</td>
//                         <td className="border px-4 py-2">{order.status}</td>
//                         <td className="border px-4 py-2">
//                           {new Date(order.orderDate).toLocaleString()}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>

//           {/* Main Admin Options */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <Link
//               href="/admin/add-product"
//               className="block bg-indigo-600 text-white p-6 rounded-xl shadow-md hover:bg-indigo-700 transition duration-300 text-center"
//             >
//               ➕ Add New Product
//             </Link>

//             <Link
//               href="/admin/manage-products"
//               className="block bg-green-600 text-white p-6 rounded-xl shadow-md hover:bg-green-700 transition duration-300 text-center"
//             >
//               📦 Manage Products
//             </Link>

//             <Link
//               href="/admin/users"
//               className="block bg-blue-600 text-white p-6 rounded-xl shadow-md hover:bg-blue-700 transition duration-300 text-center"
//             >
//               👥 Manage Users
//             </Link>
//           </div>
//         </div>
//       </div>
//     </AdminGuard>
//   );
// }
//2
// 'use client';
// import React, { useState } from 'react';
// import Link from 'next/link';
// import AdminGuard from '@/components/admin/AdminGuard';

// export default function AdminDashboard() {
//   const [orders, setOrders] = useState([]);
//   const [loadingOrders, setLoadingOrders] = useState(false);
//   const [showOrders, setShowOrders] = useState(false);

//   const fetchOrders = async () => {
//     setLoadingOrders(true);
//     try {
//       const res = await fetch('/api/admin/orders'); // your existing API
//       const data = await res.json();
//       if (data.success) {
//         setOrders(data.orders);
//         setShowOrders(true);
//       } else {
//         console.error('Failed to fetch orders:', data.message);
//       }
//     } catch (err) {
//       console.error('Error fetching orders:', err);
//     } finally {
//       setLoadingOrders(false);
//     }
//   };

//   return (
//     <AdminGuard>
//       <div className="min-h-screen bg-gray-100 p-8">
//         <div className="container mx-auto max-w-6xl">
//           <header className="flex justify-between items-center mb-8 border-b pb-4">
//             <h1 className="text-3xl font-bold text-gray-800">🛠️ Admin Dashboard</h1>
//             <Link
//               href="/"
//               className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300 shadow-md"
//             >
//               ← Back to Home
//             </Link>
//           </header>

//           {/* Admin Options */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             <Link
//               href="/admin/add-product"
//               className="block bg-indigo-600 text-white p-6 rounded-xl shadow-md hover:bg-indigo-700 transition duration-300 text-center"
//             >
//               ➕ Add New Product
//             </Link>

//             <Link
//               href="/admin/manage-products"
//               className="block bg-green-600 text-white p-6 rounded-xl shadow-md hover:bg-green-700 transition duration-300 text-center"
//             >
//               📦 Manage Products
//             </Link>

//             <Link
//               href="/admin/users"
//               className="block bg-blue-600 text-white p-6 rounded-xl shadow-md hover:bg-blue-700 transition duration-300 text-center"
//             >
//               👥 Manage Users
//             </Link>

//             {/* Button to show orders */}
//             <button
//               onClick={fetchOrders}
//               className="col-span-full bg-yellow-600 text-white p-6 rounded-xl shadow-md hover:bg-yellow-700 transition duration-300 text-center"
//             >
//               📝 View Orders
//             </button>
//           </div>

//           {/* Orders Section */}
//           {showOrders && (
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
//               {loadingOrders ? (
//                 <p>Loading orders...</p>
//               ) : orders.length === 0 ? (
//                 <p>No orders found.</p>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full border border-gray-300">
//                     <thead className="bg-gray-100">
//                       <tr>
//                         <th className="border px-4 py-2">Order ID</th>
//                         <th className="border px-4 py-2">Customer</th>
//                         <th className="border px-4 py-2">Email</th>
//                         <th className="border px-4 py-2">Total Amount</th>
//                         <th className="border px-4 py-2">Status</th>
//                         <th className="border px-4 py-2">Date</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {orders.map((order) => (
//                         <tr key={order._id}>
//                           <td className="border px-4 py-2">{order._id}</td>
//                           <td className="border px-4 py-2">{order.userInfo.name}</td>
//                           <td className="border px-4 py-2">{order.userInfo.email}</td>
//                           <td className="border px-4 py-2">${order.totalAmount.toFixed(2)}</td>
//                           <td className="border px-4 py-2">{order.status}</td>
//                           <td className="border px-4 py-2">
//                             {new Date(order.createdAt).toLocaleString()}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </AdminGuard>
//   );
// }
//corrrect
// 'use client';
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import AdminGuard from '@/components/admin/AdminGuard';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export default function AdminDashboard() {
//   const [orders, setOrders] = useState([]);
//   const [loadingOrders, setLoadingOrders] = useState(false);
//   const [showOrders, setShowOrders] = useState(false);

//   const [analytics, setAnalytics] = useState(null);

//   const [reviews, setReviews] = useState([]);
//   const [showReviews, setShowReviews] = useState(false);
//   const [loadingReviews, setLoadingReviews] = useState(false);

//   // Fetch orders
//   const fetchOrders = async () => {
//     setLoadingOrders(true);
//     try {
//       const res = await fetch('/api/admin/orders');
//       const data = await res.json();
//       if (data.success) {
//         setOrders(data.orders);
//         setShowOrders(true);
//       } else {
//         console.error('Failed to fetch orders:', data.message);
//       }
//     } catch (err) {
//       console.error('Error fetching orders:', err);
//     } finally {
//       setLoadingOrders(false);
//     }
//   };

//   // Update order status
//   const updateOrderStatus = async (orderId, newStatus) => {
//     try {
//       const res = await fetch(`/api/admin/order/${orderId}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status: newStatus }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setOrders((prev) =>
//           prev.map((order) =>
//             order._id === orderId ? { ...order, status: newStatus } : order
//           )
//         );
//       } else {
//         alert('Failed to update status');
//       }
//     } catch (err) {
//       console.error('Error updating status:', err);
//       alert('Error updating status');
//     }
//   };

//   // Fetch analytics
//   const fetchAnalytics = async () => {
//     try {
//       const res = await fetch('/api/admin/analytics');
//       const data = await res.json();
//       if (data.success) setAnalytics(data.analytics);
//     } catch (err) {
//       console.error('Failed to fetch analytics:', err);
//     }
//   };

//   // Fetch product reviews
//   const fetchReviews = async () => {
//     setLoadingReviews(true);
//     try {
//       const res = await fetch('/api/admin/reviews'); // Make sure this API returns all reviews
//       const data = await res.json();
//       if (data.success) {
//         setReviews(data.reviews);
//         setShowReviews(true);
//       } else {
//         console.error('Failed to fetch reviews:', data.message);
//       }
//     } catch (err) {
//       console.error('Error fetching reviews:', err);
//     } finally {
//       setLoadingReviews(false);
//     }
//   };

//   useEffect(() => {
//     fetchAnalytics();
//   }, []);

//   // Render a chart
//   const renderChart = (title, data) => (
//     <div className="mb-8 p-4 bg-white rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">{title}</h2>
//       <Bar
//         data={{
//           labels: data.map((d) => d.key),
//           datasets: [
//             {
//               label: 'Profit',
//               data: data.map((d) => d.totalProfit),
//               backgroundColor: 'rgba(59,130,246,0.7)',
//             },
//           ],
//         }}
//         options={{
//           responsive: true,
//           plugins: { legend: { position: 'top' } },
//         }}
//       />
//     </div>
//   );

//   return (
//     <AdminGuard>
//       <div className="min-h-screen bg-gray-100 p-8">
//         <div className="container mx-auto max-w-6xl">
//           <header className="flex justify-between items-center mb-8 border-b pb-4">
//             <h1 className="text-3xl font-bold text-gray-800">🛠️ Admin Dashboard</h1>
//             <Link
//               href="/"
//               className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300 shadow-md"
//             >
//               ← Back to Home
//             </Link>
//           </header>

//           {/* Admin Options */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             <Link
//               href="/admin/add-product"
//               className="block bg-indigo-600 text-white p-6 rounded-xl shadow-md hover:bg-indigo-700 transition duration-300 text-center"
//             >
//               ➕ Add New Product
//             </Link>

//             <Link
//               href="/admin/manage-products"
//               className="block bg-green-600 text-white p-6 rounded-xl shadow-md hover:bg-green-700 transition duration-300 text-center"
//             >
//               📦 Manage Products
//             </Link>

//             <Link
//               href="/admin/users"
//               className="block bg-blue-600 text-white p-6 rounded-xl shadow-md hover:bg-blue-700 transition duration-300 text-center"
//             >
//               👥 Manage Users
//             </Link>

//             <button
//               onClick={fetchOrders}
//               className="col-span-full bg-yellow-600 text-white p-6 rounded-xl shadow-md hover:bg-yellow-700 transition duration-300 text-center"
//             >
//               📝 View Orders
//             </button>

//             <button
//               onClick={fetchReviews}
//               className="col-span-full bg-pink-600 text-white p-6 rounded-xl shadow-md hover:bg-pink-700 transition duration-300 text-center"
//             >
//               📝 View Product Reviews
//             </button>
//           </div>

//           {/* Orders Section */}
//           {showOrders && (
//             <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//               <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
//               {loadingOrders ? (
//                 <p>Loading orders...</p>
//               ) : orders.length === 0 ? (
//                 <p>No orders found.</p>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full border border-gray-300">
//                     <thead className="bg-gray-100">
//                       <tr>
//                         <th className="border px-4 py-2">Order ID</th>
//                         <th className="border px-4 py-2">Customer</th>
//                         <th className="border px-4 py-2">Email</th>
//                         <th className="border px-4 py-2">Total Amount</th>
//                         <th className="border px-4 py-2">Status</th>
//                         <th className="border px-4 py-2">Date</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {orders.map((order) => (
//                         <tr key={order._id}>
//                           <td className="border px-4 py-2">{order._id}</td>
//                           <td className="border px-4 py-2">{order.userInfo.name}</td>
//                           <td className="border px-4 py-2">{order.userInfo.email}</td>
//                           <td className="border px-4 py-2">${order.totalAmount.toFixed(2)}</td>
//                           <td className="border px-4 py-2">
//                             <select
//                               value={order.status}
//                               className="border rounded px-2 py-1"
//                               onChange={(e) =>
//                                 updateOrderStatus(order._id, e.target.value)
//                               }
//                             >
//                               <option value="Pending">Pending</option>
//                               <option value="Processing">Processing</option>
//                               <option value="Dispatched">Dispatched</option>
//                               <option value="Delivered">Delivered</option>
//                               <option value="Cancelled">Cancelled</option>
//                             </select>
//                           </td>
//                           <td className="border px-4 py-2">
//                             {new Date(order.createdAt).toLocaleString()}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Analytics Section */}
//           {analytics ? (
//             <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
//               <h2 className="text-2xl font-semibold mb-6">📊 Profit Analytics</h2>
//               {renderChart('Profit by Gender', analytics.genderProfit)}
//               {renderChart('Profit by Fabric', analytics.fabricProfit)}
//               {renderChart('Profit by Category', analytics.categoryProfit)}
//               {renderChart('Profit by Season', analytics.seasonProfit)}
//             </div>
//           ) : (
//             <p className="p-4">Loading analytics...</p>
//           )}

//           {/* Reviews Section */}
//           {showReviews && (
//             <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//               <h2 className="text-2xl font-semibold mb-4">Product Reviews</h2>
//               {loadingReviews ? (
//                 <p>Loading reviews...</p>
//               ) : reviews.length === 0 ? (
//                 <p>No reviews found.</p>
//               ) : (
//                 <div className="space-y-4">
//                   {reviews.map((r) => (
//                     <div key={r._id} className="border p-4 rounded shadow-sm">
//                       <p><strong>Product ID:</strong> {r.productId}</p>
//                       <p><strong>Customer:</strong> {r.name}</p>
//                       <p>
//                         <strong>Rating:</strong>{" "}
//                         {[1,2,3,4,5].map((star) => (
//                           <span key={star} className={star <= r.rating ? "text-yellow-500" : "text-gray-300"}>★</span>
//                         ))}
//                       </p>
//                       <p><strong>Review:</strong> {r.text}</p>
//                       <p className="text-sm text-gray-500">
//                         <strong>Date:</strong> {new Date(r.date).toLocaleString()}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </AdminGuard>
//   );
// }
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminGuard from '@/components/admin/AdminGuard';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  const [analytics, setAnalytics] = useState(null);

  // Fetch orders
  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
        setShowOrders(true);
      } else {
        console.error('Failed to fetch orders:', data.message);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/admin/order/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Error updating status');
    }
  };

  // Fetch analytics
  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/admin/analytics');
      const data = await res.json();
      if (data.success) setAnalytics(data.analytics);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Render a chart
  const renderChart = (title, data) => (
    <div className="mb-8 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <Bar
        data={{
          labels: data.map((d) => d.key),
          datasets: [
            {
              label: 'Profit',
              data: data.map((d) => d.totalProfit),
              backgroundColor: 'rgba(59,130,246,0.7)',
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: { legend: { position: 'top' } },
        }}
      />
    </div>
  );

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="container mx-auto max-w-6xl">
          <header className="flex justify-between items-center mb-8 border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-800">🛠️ Admin Dashboard</h1>
            <Link
              href="/"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300 shadow-md"
            >
              ← Back to Home
            </Link>
          </header>

          {/* Admin Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Link
              href="/admin/add-product"
              className="block bg-indigo-600 text-white p-6 rounded-xl shadow-md hover:bg-indigo-700 transition duration-300 text-center"
            >
              ➕ Add New Product
            </Link>

            <Link
              href="/admin/manage-products"
              className="block bg-green-600 text-white p-6 rounded-xl shadow-md hover:bg-green-700 transition duration-300 text-center"
            >
              📦 Manage Products
            </Link>

            <Link
              href="/admin/manage-users"
              className="block bg-blue-600 text-white p-6 rounded-xl shadow-md hover:bg-blue-700 transition duration-300 text-center"
            >
              👥 Manage Users
            </Link>

            <button
              onClick={fetchOrders}
              className="col-span-full bg-yellow-600 text-white p-6 rounded-xl shadow-md hover:bg-yellow-700 transition duration-300 text-center"
            >
              📝 View Orders
            </button>

            {/* Open reviews in a new page */}
            <Link
              href="/admin/reviews"
              className="col-span-full bg-pink-600 text-white p-6 rounded-xl shadow-md hover:bg-pink-700 transition duration-300 text-center"
            >
              📝 View Product Reviews
            </Link>
          </div>

          {/* Orders Section */}
          {showOrders && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
              {loadingOrders ? (
                <p>Loading orders...</p>
              ) : orders.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-4 py-2">Order ID</th>
                        <th className="border px-4 py-2">Customer</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Total Amount</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td className="border px-4 py-2">{order._id}</td>
                          <td className="border px-4 py-2">{order.userInfo.name}</td>
                          <td className="border px-4 py-2">{order.userInfo.email}</td>
                          <td className="border px-4 py-2">${order.totalAmount.toFixed(2)}</td>
                          <td className="border px-4 py-2">
                            <select
                              value={order.status}
                              className="border rounded px-2 py-1"
                              onChange={(e) =>
                                updateOrderStatus(order._id, e.target.value)
                              }
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="border px-4 py-2">
                            {new Date(order.createdAt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Analytics Section */}
          {analytics ? (
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-semibold mb-6">📊 Profit Analytics</h2>
              {renderChart('Profit by Gender', analytics.genderProfit)}
              {renderChart('Profit by Fabric', analytics.fabricProfit)}
              {renderChart('Profit by Category', analytics.categoryProfit)}
              {renderChart('Profit by Season', analytics.seasonProfit)}
            </div>
          ) : (
            <p className="p-4">Loading analytics...</p>
          )}
        </div>
      </div>
    </AdminGuard>
  );
}
