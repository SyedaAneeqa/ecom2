// import { useRouter } from 'next/router';
// import cardData from '../../store/cardData.json';
// import Image from 'next/image';
// import { useState, useEffect } from 'react';

// const ItemPage = () => {
//   const router = useRouter();
//   const { item } = router.query;
//   const [product, setProduct] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [reviews, setReviews] = useState([]);
//   const [reviewText, setReviewText] = useState("");
//   const [customerName, setCustomerName] = useState("");

//   const handleSubmitReview = () => {
//     if (!rating || !reviewText.trim()) {
//       alert("Please provide both a rating and a review.");
//       return;
//     }

//     const newReview = {
//       name: customerName,
//       rating,
//       text: reviewText,
//       date: new Date().toLocaleDateString(),
//     };

//     const updatedReviews = [...reviews, newReview];
//     setReviews(updatedReviews);
//     localStorage.setItem(`reviews-${product.id}`, JSON.stringify(updatedReviews));

//     // Reset form and close popup
//     setRating(0);
//     setReviewText("");
//     setShowPopup(false);
//   };


//   useEffect(() => {
//     // This effect ensures the component re-renders when the URL changes
//     // and finds the correct product data.
//     if (item) {
//       const foundProduct = cardData.find(p => p.id === item);
//       setProduct(foundProduct);
//     }
//   }, [item]); // Depend on 'item' to re-run when the URL changes

  
//   // Load existing reviews from localStorage for this product
//   useEffect(() => {
//     if (product?.id) {
//       const storedReviews =
//         JSON.parse(localStorage.getItem(`reviews-${product.id}`)) || [];
//       setReviews(storedReviews);
//     }
//   }, [product]);

//   if (!product) {
//     return <div>Product not found.</div>;
//   }

//   // Handle the "Back to Products" button click
//   const handleBack = () => {
//     router.back();
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex flex-col md:flex-row items-center">
//         <div className="w-full md:w-1/2">
//           <div className="relative w-full h-96">
//             <Image src={product.img} layout="fill" objectFit="contain" alt={product.name} />
//           </div>
//         </div>
//         <div className="w-full md:w-1/2 p-4">
//           <h1 className="text-4xl font-bold">{product.name}</h1>
//           <p className="text-gray-600 mt-2">{product.description}</p>
//           <p className="text-2xl mt-4">Rs {Object.values(product.sizes)[0]}</p>
//           <button 
//             className="mt-8 border rounded p-2 "
//             onClick={() =>
//               setShowPopup(true)
//             }
//           > 
//             Write a review
//           </button>
//           {showPopup && (
//             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//               <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
//                 <button
//                   onClick={() => setShowPopup(false)}
//                   className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
//                 >
//                   ✕
//                 </button>

//                 {/* Popup content (your review form or component) */}
//                 {/* Star Rating */}
//                 <div className="flex mb-4">
//                   <h2 className="text-base font-bold text-gray-900 mb-4">Your Name:</h2>
//                   <input
//                     id="customerName"
//                     type="text"
//                     placeholder="Enter your name"
//                     className="border rounded p-1 w-40 h-8 text-gray-700 text-sm placeholder:font-semibold placeholder:text-gray-500 placeholder:text-xs"
//                     value={customerName}
//                     onChange={(e) => setCustomerName(e.target.value)}
//                   ></input>
//                   <h2 className="text-base font-bold text-gray-900 mb-4">  How would you rate this product:</h2>
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <svg
//                         key={star}
//                         onClick={() => setRating(star)}
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 20 20"
//                         fill={star <= rating ? "#facc15" : "gray"}  // yellow for selected
//                         className="w-6 h-6 cursor-pointer transition-transform transform hover:scale-110"
//                       >
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.182c.969 0 1.371 1.24.588 1.81l-3.387 2.463a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.387-2.463a1 1 0 00-1.175 0l-3.387 2.463c-.785.57-1.84-.197-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.182a1 1 0 00.95-.69l1.286-3.974z" />
//                       </svg>
//                     ))}
//                 </div>

//                 <h2 className="text-xl font-semibold text-gray-900 mb-4">Write a Review</h2>
//                   <textarea
//                     className="w-full border rounded p-2 mb-4 font-bold text-gray-700 placeholder:font-semibold placeholder:text-gray-500"
//                     rows="4"
//                     placeholder ="Write your review here..."
//                     value={reviewText}
//                     onChange={(e)=> setReviewText(e.target.value)}
//                   ></textarea>
                  
//                   <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmitReview}>
//                     Submit
//                   </button>
                  
//               </div>
//             </div>
//           )}

          
          
//         </div>
        
//       </div>
//       {/* Display Reviews */}
//       <div className="mt-10">
//         <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
//         {reviews.length === 0 ? (
//           <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
//         ) : (
//           reviews.map((r, index) => (
//             <div key={index} className="border-b pb-4 mb-4">
//               <p className="text-white-800 font-bold">{r.name}</p>
//               <div className="flex items-center mb-1">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <svg
//                     key={star}
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 20 20"
//                     fill={star <= r.rating ? "#facc15" : "gray"}
//                     className="w-5 h-5"
//                   >
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.182c.969 0 1.371 1.24.588 1.81l-3.387 2.463a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.387-2.463a1 1 0 00-1.175 0l-3.387 2.463c-.785.57-1.84-.197-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.182a1 1 0 00.95-.69l1.286-3.974z" />
//                   </svg>
//                 ))}
//               </div>
//               <p className="text-white-800 font-bold">{r.text}</p>
//               <p className="text-sm text-ehite-500 font-bold">{r.date}</p>
//             </div>
//           ))
//         )}
//       </div>

//       <button 
//         className="mt-8 border rounded p-2"
//         onClick={handleBack}
//       >
//         &larr; Back to Products
//       </button>
//     </div>
//   );
// };

// export default ItemPage;
//2
// 'use client';
// import { useRouter } from 'next/router';
// import cardData from '../../store/cardData.json';
// import Image from 'next/image';
// import { useState, useEffect } from 'react';

// const ItemPage = () => {
//   const router = useRouter();
//   const { item } = router.query;
//   const [product, setProduct] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [reviews, setReviews] = useState([]);
//   const [reviewText, setReviewText] = useState("");
//   const [customerName, setCustomerName] = useState("");

//   const handleSubmitReview = () => {
//     if (!rating || !reviewText.trim() || !customerName.trim()) { // Check for customerName
//       alert("Please provide your name, a rating, and a review.");
//       return;
//     }

//     const newReview = {
//       name: customerName,
//       rating,
//       text: reviewText,
//       date: new Date().toLocaleDateString(),
//     };

//     const updatedReviews = [...reviews, newReview];
//     setReviews(updatedReviews);
//     localStorage.setItem(`reviews-${product.id}`, JSON.stringify(updatedReviews));

//     // Reset form and close popup
//     setRating(0);
//     setReviewText("");
//     setCustomerName(""); // Reset name
//     setShowPopup(false);
//   };


//   useEffect(() => {
//     // This effect ensures the component re-renders when the URL changes
//     // and finds the correct product data.
//     if (item) {
//       const foundProduct = cardData.find(p => p.id === item);
//       setProduct(foundProduct);
//     }
//   }, [item]); // Depend on 'item' to re-run when the URL changes

//   
//   // Load existing reviews from localStorage for this product
//   useEffect(() => {
//     if (product?.id) {
//       const storedReviews =
//         JSON.parse(localStorage.getItem(`reviews-${product.id}`)) || [];
//       setReviews(storedReviews);
//     }
//   }, [product]);

//   if (!product) {
//     return <div>Product not found.</div>;
//   }

//   // Handle the "Back to Products" button click
//   const handleBack = () => {
//     router.back();
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex flex-col md:flex-row items-center">
//         <div className="w-full md:w-1/2">
//           <div className="relative w-full h-96">
//             <Image src={product.img} layout="fill" objectFit="contain" alt={product.name} />
//           </div>
//         </div>
//         <div className="w-full md:w-1/2 p-4">
//           <h1 className="text-4xl font-bold">{product.name}</h1>
//           <p className="text-gray-600 mt-2">{product.description}</p>
//           
//             {/* 💡 REQUIRED EDIT: Use the single retailPrice field */}
//           <p className="text-2xl mt-4">Rs {product.retailPrice}</p> 

//           <button 
//             className="mt-8 border rounded p-2 "
//             onClick={() => setShowPopup(true)}
//           > 
//             Write a review
//           </button>
//           
//           {showPopup && (
//             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//               <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
//                 <button
//                   onClick={() => setShowPopup(false)}
//                   className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
//                 >
//                   ✕
//                 </button>
                
//                 <h2 className="text-xl font-bold text-gray-900 mb-4">Submit a Review</h2>

//                 {/* Customer Name Input */}
//                 <div className="flex items-center space-x-2 mb-4">
//                   <label htmlFor="customerName" className="font-bold text-gray-900">Your Name:</label>
//                   <input
//                     id="customerName"
//                     type="text"
//                     placeholder="Enter your name"
//                     className="border rounded p-1 flex-1 text-gray-700 text-sm placeholder:font-semibold placeholder:text-gray-500 placeholder:text-xs"
//                     value={customerName}
//                     onChange={(e) => setCustomerName(e.target.value)}
//                   ></input>
//                 </div>

//                 {/* Star Rating */}
//                 <div className="flex items-center mb-4">
//                   <h2 className="font-bold text-gray-900 mr-2">Rate:</h2>
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <svg
//                         key={star}
//                         onClick={() => setRating(star)}
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 20 20"
//                         fill={star <= rating ? "#facc15" : "gray"}  // yellow for selected
//                         className="w-6 h-6 cursor-pointer transition-transform transform hover:scale-110"
//                       >
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.182c.969 0 1.371 1.24.588 1.81l-3.387 2.463a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.387-2.463a1 1 0 00-1.175 0l-3.387 2.463c-.785.57-1.84-.197-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.182a1 1 0 00.95-.69l1.286-3.974z" />
//                       </svg>
//                     ))}
//                 </div>

//                 <label htmlFor="reviewText" className="block font-bold text-gray-900 mb-2">Your Review:</label>
//                   <textarea
//                     id="reviewText"
//                     className="w-full border rounded p-2 mb-4 font-bold text-gray-700 placeholder:font-semibold placeholder:text-gray-500"
//                     rows="4"
//                     placeholder ="Write your review here..."
//                     value={reviewText}
//                     onChange={(e)=> setReviewText(e.target.value)}
//                   ></textarea>
//                   
//                   <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleSubmitReview}>
//                     Submit Review
//                   </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       {/* Display Reviews */}
//       <div className="mt-10">
//         <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
//         {reviews.length === 0 ? (
//           <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
//         ) : (
//           reviews.map((r, index) => (
//             <div key={index} className="border-b pb-4 mb-4">
//               <p className="text-gray-800 font-bold">{r.name || "Anonymous"}</p>
//               <div className="flex items-center mb-1">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <svg
//                     key={star}
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 20 20"
//                     fill={star <= r.rating ? "#facc15" : "gray"}
//                     className="w-5 h-5"
//                   >
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.182c.969 0 1.371 1.24.588 1.81l-3.387 2.463a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.387-2.463a1 1 0 00-1.175 0l-3.387 2.463c-.785.57-1.84-.197-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.182a1 1 0 00.95-.69l1.286-3.974z" />
//                   </svg>
//                 ))}
//               </div>
//               <p className="text-gray-800">{r.text}</p>
//               <p className="text-sm text-gray-500">{r.date}</p>
//             </div>
//           ))
//         )}
//       </div>

//       <button 
//         className="mt-8 border rounded p-2 hover:bg-gray-100 transition"
//         onClick={handleBack}
//       >
//         &larr; Back to Products
//       </button>
//     </div>
//   );
// };

// export default ItemPage;
// /api/reviews/[id].js
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import cardData from '../../store/cardData.json';

// /**
//  * Helper function to format the review date.
//  * @param {string} dateString - The ISO date string from the review object.
//  * @returns {string} The formatted local date/time string or "N/A".
//  */
// const formatReviewDate = (dateString) => {
//   try {
//     const date = new Date(dateString);
//     // Check if the date is valid before formatting
//     if (dateString && !isNaN(date)) {
//       return date.toLocaleString();
//     }
//   } catch (error) {
//     // Silently ignore date parsing errors
//   }
//   return "N/A";
// };

// const ItemPage = () => {
//   const router = useRouter();
//   // Use 'item' from the router query, corresponding to the file name
//   const { item } = router.query; 

//   const [product, setProduct] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [rating, setRating] = useState(5); // default rating
//   const [reviews, setReviews] = useState([]);
//   const [reviewText, setReviewText] = useState("");
//   const [customerName, setCustomerName] = useState("");

//   // Fetch product data when item ID changes
//   useEffect(() => {
//     // Ensure router.query.item is available and ready before fetching
//     if (item) {
//       const foundProduct = cardData.find(p => p.id === item);
//       setProduct(foundProduct);
//     }
//   }, [item]);

//   // Fetch reviews from the database
//   useEffect(() => {
//     // Only fetch reviews if the product data (and its ID) is loaded
//     if (product?.id) {
//       // Use the actual product ID for fetching reviews
//       fetch(`/api/reviews/${product.id}`)
//         .then(res => res.json())
//         .then(data => {
//           if (data.success) setReviews(data.reviews);
//         })
//         .catch(err => console.error("Failed to fetch reviews:", err));
//     }
//   }, [product]);

//   const handleSubmitReview = async () => {
//     if (!rating || !reviewText.trim() || !customerName.trim()) {
//       alert("Please provide your name, a rating, and a review.");
//       return;
//     }

//     try {
//       const res = await fetch(`/api/reviews/${product.id}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: customerName,
//           rating,
//           text: reviewText,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         // Use the review object returned by the server (which includes the date)
//         setReviews(prev => [data.review, ...prev]);
//         setRating(5); // reset to default
//         setReviewText("");
//         setCustomerName("");
//         setShowPopup(false);
//         alert("Review submitted successfully!");
//       } else {
//         alert(data.message || "Failed to submit review"); 
//       }
//     } catch (err) {
//       console.error("Error submitting review:", err);
//       alert("Error submitting review");
//     }
//   };

//   const handleBack = () => {
//     router.back();
//   };

//   if (!product) return <div>Product not found.</div>;

//   return (
//     <div className="container mx-auto p-4">
//       {/* Product Details */}
//       <div className="flex flex-col md:flex-row items-center">
//         <div className="w-full md:w-1/2">
//           <div className="relative w-full h-96">
//             <Image
//               src={product.img}
//               layout="fill"
//               objectFit="contain"
//               alt={product.name}
//             />
//           </div>
//         </div>

//         <div className="w-full md:w-1/2 p-4">
//           <h1 className="text-4xl font-bold">{product.name}</h1>
//           <p className="text-gray-600 mt-2">{product.description}</p>
//           <p className="text-2xl mt-4">Rs {product.retailPrice}</p>

//           <button
//             className="mt-8 border rounded p-2"
//             onClick={() => setShowPopup(true)}
//           >
//             Write a review
//           </button>

//           {/* Review Popup */}
//           {showPopup && (
//             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//               <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
//                 <button
//                   onClick={() => setShowPopup(false)}
//                   className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
//                 >
//                   ✕
//                 </button>

//                 <h2 className="text-xl font-bold text-gray-900 mb-4">
//                   Submit a Review
//                 </h2>

//                 {/* Customer Name */}
//                 <div className="flex items-center space-x-2 mb-4">
//                   <label htmlFor="customerName" className="font-bold text-gray-900">
//                     Your Name:
//                   </label>
//                   <input
//                     id="customerName"
//                     type="text"
//                     placeholder="Enter your name"
//                     className="border rounded p-1 flex-1 text-gray-700 text-sm placeholder:font-semibold placeholder:text-gray-500 placeholder:text-xs"
//                     value={customerName}
//                     onChange={(e) => setCustomerName(e.target.value)}
//                   />
//                 </div>

//                 {/* Star Rating */}
//                 <div className="flex items-center mb-4">
//                   <h2 className="font-bold text-gray-900 mr-2">Rate:</h2>
//                   {[1, 2, 3, 4, 5].map(star => (
//                     <svg
//                       key={star}
//                       onClick={() => setRating(star)}
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 20 20"
//                       fill={star <= rating ? "#facc15" : "gray"}
//                       className="w-6 h-6 cursor-pointer transition-transform transform hover:scale-110"
//                     >
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.182c.969 0 1.371 1.24.588 1.81l-3.387 2.463a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.387-2.463a1 1 0 00-1.175 0l-3.387 2.463c-.785.57-1.84-.197-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.182a1 1 0 00.95-.69l1.286-3.974z" />
//                     </svg>
//                   ))}
//                 </div>

//                 {/* Review Text */}
//                 <label htmlFor="reviewText" className="block font-bold text-gray-900 mb-2">
//                   Your Review:
//                 </label>
//                 <textarea
//                   id="reviewText"
//                   className="w-full border rounded p-2 mb-4 font-bold text-gray-700 placeholder:font-semibold placeholder:text-gray-500"
//                   rows="4"
//                   placeholder="Write your review here..."
//                   value={reviewText}
//                   onChange={(e) => setReviewText(e.target.value)}
//                 />

//                 <button
//                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                   onClick={handleSubmitReview}
//                 >
//                   Submit Review
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Reviews List */}
//       <div className="mt-10">
//         <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
//         {reviews.length === 0 ? (
//           <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
//         ) : (
//           reviews.map((r, index) => (
//             <div key={r._id || index} className="border-b pb-4 mb-4">
//               <p className="text-gray-800 font-bold">{r.name || "Anonymous"}</p>
//               <div className="flex items-center mb-1">
//                 {[1, 2, 3, 4, 5].map(star => (
//                   <svg
//                     key={star}
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 20 20"
//                     fill={star <= r.rating ? "#facc15" : "gray"}
//                     className="w-5 h-5"
//                   >
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.182c.969 0 1.371 1.24.588 1.81l-3.387 2.463a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.387-2.463a1 1 0 00-1.175 0l-3.387 2.463c-.785.57-1.84-.197-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.182a1 1 0 00.95-.69l1.286-3.974z" />
//                   </svg>
//                 ))}
//               </div>
//               <p className="text-gray-800">{r.text}</p>
//               <p className="text-sm text-gray-500">
//                 {formatReviewDate(r.date)}
//               </p>
//             </div>
//           ))
//         )}
//       </div>

//       <button
//         className="mt-8 border rounded p-2 hover:bg-gray-100 transition"
//         onClick={handleBack}
//       >
//         &larr; Back to Products
//       </button>
//     </div>
//   );
// };

// export default ItemPage;
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import cardData from '../../store/cardData.json';

/**
 * Helper function to format the review date.
 */
const formatReviewDate = (dateString) => {
  try {
    const date = new Date(dateString);
    if (dateString && !isNaN(date)) {
      return date.toLocaleString();
    }
  } catch {
    return "N/A";
  }
  return "N/A";
};

const ItemPage = () => {
  const router = useRouter();
  const { item } = router.query;

  const [product, setProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch product from local JSON
  useEffect(() => {
    if (item) {
      const foundProduct = cardData.find(p => String(p.id) === String(item));
      setProduct(foundProduct);
    }
  }, [item]);

  // Fetch reviews for the product
  useEffect(() => {
    if (product?.id) {
      fetch(`/api/reviews/${product.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) setReviews(data.reviews);
        })
        .catch(err => console.error("Failed to fetch reviews:", err));
    }
  }, [product]);

  const handleSubmitReview = async () => {
    if (!rating || !reviewText.trim() || !customerName.trim()) {
      alert("Please provide your name, a rating, and a review.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/reviews/${product.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customerName,
          rating,
          text: reviewText,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Add new review at the top of the list
        setReviews(prev => [data.review, ...prev]);
        setRating(5);
        setReviewText("");
        setCustomerName("");
        setShowPopup(false);
        alert("Review submitted successfully!");
      } else {
        alert(data.message || "Failed to submit review");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Error submitting review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => router.back();

  if (!product) return <div>Product not found.</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Product Details */}
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2">
          <div className="relative w-full h-96">
            <Image
              src={product.img}
              layout="fill"
              objectFit="contain"
              alt={product.name}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-2xl mt-4">Rs {product.retailPrice}</p>

          <button
            className="mt-8 border rounded p-2"
            onClick={() => setShowPopup(true)}
          >
            Write a review
          </button>

          {/* Review Popup */}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                  ✕
                </button>

                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Submit a Review
                </h2>

                {/* Customer Name */}
                <div className="flex items-center space-x-2 mb-4">
                  <label htmlFor="customerName" className="font-bold text-gray-900">
                    Your Name:
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    placeholder="Enter your name"
                    className="border rounded p-1 flex-1 text-gray-700 text-sm placeholder:font-semibold placeholder:text-gray-500 placeholder:text-xs"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>

                {/* Star Rating */}
                <div className="flex items-center mb-4">
                  <h2 className="font-bold text-gray-900 mr-2">Rate:</h2>
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg
                      key={star}
                      onClick={() => setRating(star)}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill={star <= rating ? "#facc15" : "gray"}
                      className="w-6 h-6 cursor-pointer transition-transform transform hover:scale-110"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.182c.969 0 1.371 1.24.588 1.81l-3.387 2.463a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.387-2.463a1 1 0 00-1.175 0l-3.387 2.463c-.785.57-1.84-.197-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.182a1 1 0 00.95-.69l1.286-3.974z" />
                    </svg>
                  ))}
                </div>

                {/* Review Text */}
                <label htmlFor="reviewText" className="block font-bold text-gray-900 mb-2">
                  Your Review:
                </label>
                <textarea
                  id="reviewText"
                  className="w-full border rounded p-2 mb-4 font-bold text-gray-700 placeholder:font-semibold placeholder:text-gray-500"
                  rows="4"
                  placeholder="Write your review here..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />

                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                  onClick={handleSubmitReview}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reviews List */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
        ) : (
          reviews.map((r, index) => (
            <div key={r._id || index} className="border-b pb-4 mb-4">
              <p className="text-gray-800 font-bold">{r.name || "Anonymous"}</p>
              <div className="flex items-center mb-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill={star <= r.rating ? "#facc15" : "gray"}
                    className="w-5 h-5"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.182c.969 0 1.371 1.24.588 1.81l-3.387 2.463a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.387-2.463a1 1 0 00-1.175 0l-3.387 2.463c-.785.57-1.84-.197-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.182a1 1 0 00.95-.69l1.286-3.974z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-800">{r.text}</p>
              <p className="text-sm text-gray-500">{formatReviewDate(r.date)}</p>
            </div>
          ))
        )}
      </div>

      <button
        className="mt-8 border rounded p-2 hover:bg-gray-100 transition"
        onClick={handleBack}
      >
        &larr; Back to Products
      </button>
    </div>
  );
};

export default ItemPage;
