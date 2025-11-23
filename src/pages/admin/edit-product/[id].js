// // // src/pages/admin/edit-product/[id].js
// // 'use client';

// // import React, { useState, useEffect } from 'react';
// // import { useRouter } from 'next/router';
// // import axios from 'axios';
// // import AdminGuard from '@/components/admin/AdminGuard'; 
// // import Link from 'next/link';

// // export default function EditProductPage() {
// //   const router = useRouter();
// //   const { id } = router.query; // Get product ID from the URL parameter [id]
  
// //   const [formData, setFormData] = useState({
// //     _id: '',
// //     name: '',
// //     category: '',
// //     gender: '',
// //     availableSizes: '', 
// //     retailPrice: '',
// //     actualCost: '',
// //     color: '',
// //     collection: '',
// //     description: '',
// //     img: '', 
// //     fabric: '',
// //   });
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // 1. FETCH existing product data on load
// //   useEffect(() => {
// //     if (!id) return; // Wait until router has the ID

// //     const fetchProduct = async () => {
// //       try {
// //         // Use the existing GET endpoint, appending the ID to fetch a single item
// //         // NOTE: If your GET endpoint only fetches ALL, you might need a separate /api/admin/products/[id]
// //         // But for simplicity, we assume we can fetch the list and find the item here, or modify the API later.
// //         // For now, let's assume a simplified API structure where we fetch the list and find it:
// //         const response = await axios.get('/api/admin/products'); 
// //         const productToEdit = response.data.products.find(p => p._id === id);

// //         if (productToEdit) {
// //             setFormData({
// //                 ...productToEdit,
// //                 // Convert sizes array back to comma-separated string for the input field
// //                 availableSizes: productToEdit.availableSizes.join(', '),
// //             });
// //         } else {
// //             setError('Product not found.');
// //         }
        
// //       } catch (err) {
// //         console.error('Error fetching product:', err);
// //         setError('Failed to fetch product data.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProduct();
// //   }, [id]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //   };

// //   // 2. HANDLE PUT request on form submit
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError(null);

// //     // Prepare data: convert sizes string to array, parse numbers
// //     const productData = {
// //       ...formData,
// //       availableSizes: formData.availableSizes.split(',').map(s => s.trim().toLowerCase()).filter(s => s),
// //       retailPrice: parseFloat(formData.retailPrice),
// //       actualCost: parseFloat(formData.actualCost),
// //     };

// //     try {
// //       // PUT request to update the product (using the ID included in the body)
// //       await axios.put('/api/admin/products', productData); 
      
// //       alert('Product updated successfully!');
// //       router.push('/admin'); // Redirect back to the dashboard
// //     } catch (err) {
// //       console.error('Error updating product:', err);
// //       setError('Failed to update product. Check the API server response.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) return (
// //     <div className="flex justify-center items-center h-screen">
// //       <p className="text-xl">Loading product details...</p>
// //     </div>
// //   );

// //   if (error) return (
// //     <div className="flex justify-center items-center h-screen">
// //       <p className="text-xl text-red-500">{error}</p>
// //     </div>
// //   );

// //   return (
// //     <AdminGuard>
// //       <div className="min-h-screen bg-gray-100 p-8">
// //         <div className="container mx-auto max-w-4xl">
// //           <header className="flex justify-between items-center mb-8 border-b pb-4">
// //             <h1 className="text-3xl font-bold text-gray-800">
// //               ✏️ Edit Product: {formData.name}
// //             </h1>
// //             <Link href="/admin" legacyBehavior>
// //               <a className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
// //                 ← Back to Dashboard
// //               </a>
// //             </Link>
// //           </header>

// //           {/* This form is largely identical to the Add Product form for consistency */}
// //           <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
// //             <h2 className="text-xl font-semibold border-b pb-3 mb-5">Product Details</h2>
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               {/* Product ID is hidden but essential for the PUT request */}
// //               <input type="hidden" name="_id" value={formData._id} /> 

// //               <label className="block">
// //                 <span className="text-gray-700">Product Name *</span>
// //                 <input 
// //                   type="text" 
// //                   name="name" 
// //                   value={formData.name} 
// //                   onChange={handleChange} 
// //                   required
// //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
// //                 />
// //               </label>

// //               <label className="block">
// //                 <span className="text-gray-700">Image URL *</span>
// //                 <input 
// //                   type="url" 
// //                   name="img" 
// //                   value={formData.img} 
// //                   onChange={handleChange} 
// //                   required
// //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
// //                 />
// //               </label>
              
// //               <label className="block">
// //                 <span className="text-gray-700">Category *</span>
// //                 <select 
// //                   name="category" 
// //                   value={formData.category} 
// //                   onChange={handleChange} 
// //                   required
// //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-white"
// //                 >
// //                   <option>Dresses</option>
// //                   <option>Sweaters</option>
// //                   <option>Shirts</option>
// //                   <option>Pants</option>
// //                 </select>
// //               </label>

// //               <label className="block">
// //                 <span className="text-gray-700">Gender *</span>
// //                 <select 
// //                   name="gender" 
// //                   value={formData.gender} 
// //                   onChange={handleChange} 
// //                   required
// //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-white"
// //                 >
// //                   <option>Women</option>
// //                   <option>Men</option>
// //                   <option>Unisex</option>
// //                 </select>
// //               </label>

// //               <label className="block">
// //                 <span className="text-gray-700">Retail Price (Rs) *</span>
// //                 <input 
// //                   type="number" 
// //                   name="retailPrice" 
// //                   value={formData.retailPrice} 
// //                   onChange={handleChange} 
// //                   required
// //                   step="any" 
// //                   min="0"
// //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
// //                 />
// //               </label>

// //               <label className="block">
// //                 <span className="text-gray-700">Actual Cost (Rs) *</span>
// //                 <input 
// //                   type="number" 
// //                   name="actualCost" 
// //                   value={formData.actualCost} 
// //                   onChange={handleChange} 
// //                   required
// //                   step="any" 
// //                   min="0"
// //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
// //                 />
// //               </label>
              
// //               <label className="block">
// //                 <span className="text-gray-700">Color</span>
// //                 <input 
// //                   type="text" 
// //                   name="color" 
// //                   value={formData.color} 
// //                   onChange={handleChange} 
// //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
// //                 />
// //               </label>

// //               <label className="block">
// //                 <span className="text-gray-700">Fabric</span>
// //                 <input 
// //                   type="text" 
// //                   name="fabric" 
// //                   value={formData.fabric} 
// //                   onChange={handleChange} 
// //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
// //                 />
// //               </label>

// //               <label className="block md:col-span-2">
// //                 <span className="text-gray-700">Available Sizes (Comma-separated: s,m,l) *</span>
// //                 <input 
// //                   type="text" 
// //                   name="availableSizes" 
// //                   value={formData.availableSizes} 
// //                   onChange={handleChange} 
// //                   required
// //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
// //                 />
// //               </label>

// //               <label className="block md:col-span-2">
// //                 <span className="text-gray-700">Description *</span>
// //                 <textarea 
// //                   name="description" 
// //                   value={formData.description} 
// //                   onChange={handleChange} 
// //                   rows="4" 
// //                   required
// //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
// //                 />
// //               </label>

// //             </div>

// //             {error && (
// //               <p className="text-red-500 text-sm mt-4">{error}</p>
// //             )}

// //             <div className="flex justify-end">
// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${
// //                   loading 
// //                     ? 'bg-green-300 text-gray-500 cursor-not-allowed'
// //                     : 'bg-green-600 text-white hover:bg-green-700 shadow-md'
// //                 }`}
// //               >
// //                 {loading ? 'Saving Changes...' : 'Save Changes'}
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </AdminGuard>
// //   );
// // }
// // src/pages/admin/edit-product/[id].js
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import AdminGuard from '@/components/admin/AdminGuard'; 
// import Link from 'next/link';

// export default function EditProductPage() {
//   const router = useRouter();
//   const { id } = router.query; 
  
//   const [formData, setFormData] = useState({
//     _id: '', id: '', name: '', category: '', gender: '', availableSizes: '', retailPrice: '',
//     actualCost: '', color: '', collection: '', description: '', img: '', fabric: '',
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // 1. FETCH existing product data
//   useEffect(() => {
//     if (!id) return; 

//     const fetchProduct = async () => {
//       try {
//         // Fetch product by ID (assuming your API can handle a query for a single product, 
//         // otherwise, use the current method of fetching all and filtering locally)
//         const response = await axios.get('/api/admin/products'); 
//         const productToEdit = response.data.products.find(p => p._id === id);

//         if (productToEdit) {
//             setFormData({
//                 ...productToEdit,
//                 // Prices are strings in the model, but we ensure they are strings for input
//                 retailPrice: String(productToEdit.retailPrice), 
//                 actualCost: String(productToEdit.actualCost),
//                 // Convert sizes array back to comma-separated string for the form input
//                 availableSizes: productToEdit.availableSizes.join(', '), 
//             });
//         } else {
//             setError('Product not found.');
//         }
        
//       } catch (err) {
//         console.error('Error fetching product:', err);
//         setError('Failed to fetch product data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // 2. HANDLE PUT request
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     // Prepare data for PUT
//     const productData = {
//       ...formData,
//       // Convert sizes string back to array
//       availableSizes: formData.availableSizes.split(',').map(s => s.trim().toLowerCase()).filter(s => s),
//       // Prices are kept as strings, no need for parseFloat()
//     };
    
//     // Remove the automatically generated _id and the custom 'id' from the update payload 
//     // if you don't want to accidentally overwrite them. However, since the API handler 
//     // uses PUT with the ID inside the body, we keep both.
//     // Ensure the required fields are filled before submitting (form validation helps here)

//     try {
//       // Send the entire formData object (including _id) to the PUT endpoint
//       await axios.put('/api/admin/products', productData); 
      
//       alert('Product updated successfully!');
//       router.push('/admin'); 
//     } catch (err) {
//       console.error('Error updating product:', err);
//       const serverMessage = err.response?.data?.details || 'Check API server logs for details.';
//       setError(`Failed to update product: ${serverMessage}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return (<div className="flex justify-center items-center h-screen"><p className="text-xl">Loading product details...</p></div>);
//   if (error) return (<div className="flex justify-center items-center h-screen"><p className="text-xl text-red-500">{error}</p></div>);

//   return (
//     <AdminGuard>
//       <div className="min-h-screen bg-gray-100 p-8">
//         <div className="container mx-auto max-w-4xl">
//           <header className="flex justify-between items-center mb-8 border-b pb-4">
//             <h1 className="text-3xl font-bold text-gray-800">✏️ Edit Product: {formData.name}</h1>
//             <Link href="/admin" legacyBehavior>
//               <a className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
//                 ← Back to Dashboard
//               </a>
//             </Link>
//           </header>

//           <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
//             <h2 className="text-xl font-semibold border-b pb-3 mb-5">Product Details</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Hidden IDs for API use */}
//               <input type="hidden" name="_id" value={formData._id} />
//               <input type="hidden" name="id" value={formData.id} />

//               <label className="block"><span className="text-gray-700">Product Name *</span>
//                 <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//               </label>

//               <label className="block"><span className="text-gray-700">Image URL *</span>
//                 <input type="url" name="img" value={formData.img} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//               </label>
              
//               <label className="block"><span className="text-gray-700">Category *</span>
//                 <select name="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-white">
//                   <option>Dresses</option><option>Sweaters</option><option>Shirts</option><option>Pants</option>
//                 </select>
//               </label>

//               <label className="block"><span className="text-gray-700">Gender *</span>
//                 <select name="gender" value={formData.gender} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-white">
//                   <option>Women</option><option>Men</option>
//                 </select>
//               </label>

//               <label className="block"><span className="text-gray-700">Retail Price (Rs) *</span>
//                 <input type="text" name="retailPrice" value={formData.retailPrice} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//               </label>

//               <label className="block"><span className="text-gray-700">Actual Cost (Rs) *</span>
//                 <input type="text" name="actualCost" value={formData.actualCost} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//               </label>
              
//               <label className="block"><span className="text-gray-700">Color *</span>
//                 <input type="text" name="color" value={formData.color} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//               </label>
              
//               {/* 🛑 MISSING FIELD ADDED HERE */}
//               <label className="block"><span className="text-gray-700">Collection *</span>
//                 <input type="text" name="collection" value={formData.collection} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//               </label>
//               {/* END ADDED FIELD */}

//               <label className="block"><span className="text-gray-700">Fabric *</span>
//                 <input type="text" name="fabric" value={formData.fabric} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//               </label>

//               {/* Occupy remaining space for formatting */}
//               <div className="hidden md:block"></div> 

//               <label className="block md:col-span-2"><span className="text-gray-700">Available Sizes (Comma-separated: s,m,l) *</span>
//                 <input type="text" name="availableSizes" value={formData.availableSizes} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//               </label>

//               <label className="block md:col-span-2"><span className="text-gray-700">Description *</span>
//                 <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//               </label>

//             </div>

//             {error && (<p className="text-red-500 text-sm mt-4">{error}</p>)}

//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${
//                   loading ? 'bg-green-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 shadow-md'
//                 }`}
//               >
//                 {loading ? 'Saving Changes...' : 'Save Changes'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </AdminGuard>
//   );
// }
// src/pages/admin/edit-product/[id].js
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import AdminGuard from '@/components/admin/AdminGuard'; 
import Link from 'next/link';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    _id: '', id: '', name: '', category: '', gender: '', availableSizes: '', retailPrice: '',
    actualCost: '', color: '', collection: '', description: '', img: '', fabric: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch existing product data
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/admin/products`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const productToEdit = response.data.products.find(p => p._id === id);

        if (productToEdit) {
          setFormData({
            ...productToEdit,
            retailPrice: String(productToEdit.retailPrice),
            actualCost: String(productToEdit.actualCost),
            availableSizes: productToEdit.availableSizes.join(', ')
          });
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch product data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const productData = {
      ...formData,
      availableSizes: formData.availableSizes
        .split(',')
        .map(s => s.trim().toLowerCase())
        .filter(s => s),
    };

    try {
      await axios.put('/api/admin/products', productData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Product updated successfully!');
      router.push('/admin');
    } catch (err) {
      console.error(err);
      const serverMessage = err.response?.data?.message || 'Check API server logs.';
      setError(`Failed to update product: ${serverMessage}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><p className="text-xl">Loading product details...</p></div>;
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-xl text-red-500">{error}</p></div>;

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="container mx-auto max-w-4xl">
          <header className="flex justify-between items-center mb-8 border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-800">✏️ Edit Product: {formData.name}</h1>
            <Link href="/admin" legacyBehavior>
              <a className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
                ← Back to Dashboard
              </a>
            </Link>
          </header>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            <h2 className="text-xl font-semibold border-b pb-3 mb-5">Product Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="hidden" name="_id" value={formData._id} />
              <input type="hidden" name="id" value={formData.id} />

              <label className="block">
                <span className="text-gray-700">Product Name *</span>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </label>

              <label className="block">
                <span className="text-gray-700">Image URL *</span>
                <input type="url" name="img" value={formData.img} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </label>

              <label className="block">
                <span className="text-gray-700">Category *</span>
                <select name="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-white">
                  <option>Dresses</option><option>Sweaters</option><option>Shirts</option><option>Pants</option>
                </select>
              </label>

              <label className="block">
                <span className="text-gray-700">Gender *</span>
                <select name="gender" value={formData.gender} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-white">
                  <option>Women</option><option>Men</option>
                </select>
              </label>

              <label className="block">
                <span className="text-gray-700">Retail Price (Rs) *</span>
                <input type="text" name="retailPrice" value={formData.retailPrice} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </label>

              <label className="block">
                <span className="text-gray-700">Actual Cost (Rs) *</span>
                <input type="text" name="actualCost" value={formData.actualCost} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </label>

              <label className="block">
                <span className="text-gray-700">Color *</span>
                <input type="text" name="color" value={formData.color} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </label>

              <label className="block">
                <span className="text-gray-700">Collection *</span>
                <input type="text" name="collection" value={formData.collection} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </label>

              <label className="block">
                <span className="text-gray-700">Fabric *</span>
                <input type="text" name="fabric" value={formData.fabric} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </label>

              <div className="hidden md:block"></div>

              <label className="block md:col-span-2">
                <span className="text-gray-700">Available Sizes (Comma-separated: s,m,l) *</span>
                <input type="text" name="availableSizes" value={formData.availableSizes} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </label>

              <label className="block md:col-span-2">
                <span className="text-gray-700">Description *</span>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </label>

            </div>

            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

            <div className="flex justify-end">
              <button type="submit" disabled={loading} className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${loading ? 'bg-green-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 shadow-md'}`}>
                {loading ? 'Saving Changes...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminGuard>
  );
}
