// 'use client';
// import { useState, useEffect } from "react";
// import AdminGuard from '@/components/admin/AdminGuard';

// export default function AdminReviews() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/admin/reviews") // <-- change this to /api/admin/reviews
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) setReviews(data.reviews);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading reviews...</p>;
//   if (reviews.length === 0) return <p>No reviews found.</p>;

//   return (
//     <AdminGuard>
//       <div className="p-6">
//         <h1 className="text-3xl font-bold mb-6">All Product Reviews</h1>
//         <div className="space-y-4">
//           {reviews.map((r) => (
//             <div key={r._id} className="border p-4 rounded shadow">
//               <p><strong>Product ID:</strong> {r.productId}</p>
//               <p><strong>Name:</strong> {r.name}</p>
//               <p>
//                 <strong>Rating:</strong>{" "}
//                 {[1,2,3,4,5].map((star) => (
//                   <span key={star} className={star <= r.rating ? "text-yellow-500" : "text-gray-300"}>★</span>
//                 ))}
//               </p>
//               <p><strong>Review:</strong> {r.text}</p>
//               <p className="text-sm text-gray-500"><strong>Date:</strong> {new Date(r.date).toLocaleString()}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </AdminGuard>
//   );
// }
// 'use client';
// import { useState, useEffect } from "react";
// import AdminGuard from '@/components/admin/AdminGuard';

// export default function AdminReviews() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/admin/reviews")
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) setReviews(data.reviews);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading reviews...</p>;
//   if (reviews.length === 0) return <p>No reviews found.</p>;

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const d = new Date(dateString);
//     if (isNaN(d.getTime())) return "N/A"; // Invalid date
//     return d.toLocaleString("en-US", {
//       dateStyle: "medium",
//       timeStyle: "short",
//     });
//   };

//   return (
//     <AdminGuard>
//       <div className="p-6">
//         <h1 className="text-3xl font-bold mb-6">All Product Reviews</h1>
//         <div className="space-y-4">
//           {reviews.map((r) => (
//             <div key={r._id} className="border p-4 rounded shadow">
//               <p><strong>Product ID:</strong> {r.productId}</p>
//               <p><strong>Name:</strong> {r.name}</p>
//               <p>
//                 <strong>Rating:</strong>{" "}
//                 {[1,2,3,4,5].map((star) => (
//                   <span 
//                     key={star} 
//                     className={star <= r.rating ? "text-yellow-500" : "text-gray-300"}
//                   >
//                     ★
//                   </span>
//                 ))}
//               </p>
//               <p><strong>Review:</strong> {r.text}</p>
//               <p className="text-sm text-gray-500">
//                 <strong>Date:</strong> {formatDate(r.date)}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </AdminGuard>
//   );
// }
'use client';
import { useState, useEffect, useCallback } from "react";
import AdminGuard from '@/components/admin/AdminGuard';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const POLLING_INTERVAL = 10000; // Check for new reviews every 10 seconds (10000 ms)

  // Function to fetch reviews from the API
  // Dependency only on reviews.length (for the simple change check)
  const fetchReviews = useCallback(async () => {
    // Note: Do NOT set loading to true here, as that would cause a 'Loading...' flash every 10s
    try {
      const res = await fetch("/api/admin/reviews");
      const data = await res.json();
      
      if (data.success) {
        // If the number of reviews has changed OR if this is the initial load (when loading is true)
        if (data.reviews.length !== reviews.length || loading) {
           setReviews(data.reviews);
        }
      }
    } catch (err) {
      console.error("Failed to fetch admin reviews during poll:", err);
    } finally {
      // Ensure loading is set to false after the initial fetch attempt finishes
      if (loading) {
        setLoading(false);
      }
    }
  }, [reviews.length, loading]); 

  // Initial fetch and Polling setup
  useEffect(() => {
    // 1. Initial fetch (using the useCallback hook)
    fetchReviews();

    // 2. Set up polling interval
    const intervalId = setInterval(() => {
      fetchReviews();
    }, POLLING_INTERVAL);

    // 3. Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
    
    // Dependencies: Only fetchReviews, as its dependencies (reviews.length, loading) are handled within useCallback
  }, [fetchReviews]); 

  // Date formatting function remains the same (robust against invalid dates)
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "N/A"; // Invalid date
    return d.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) return <p>Loading reviews...</p>;
  if (reviews.length === 0) return <p>No reviews found.</p>;

 return (

    <AdminGuard>

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">All Product Reviews</h1>

        <div className="space-y-4">

          {reviews.map((r) => (

            <div key={r._id} className="border p-4 rounded shadow">

              <p><strong>Product ID:</strong> {r.productId}</p>

              <p><strong>Name:</strong> {r.name}</p>

              <p>

                <strong>Rating:</strong>{" "}

                {[1,2,3,4,5].map((star) => (

                  <span

                    key={star}

                    className={star <= r.rating ? "text-yellow-500" : "text-gray-300"}

                  >

                    ★

                  </span>

                ))}

              </p>

              <p><strong>Review:</strong> {r.text}</p>

              <p className="text-sm text-gray-500">

                {/* <strong>Date:</strong> {formatDate(r.date)} */}

              </p>

            </div>

          ))}

        </div>

      </div>

    </AdminGuard>

  );

};