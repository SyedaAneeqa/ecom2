
// // src/pages/admin/add-product.js
// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import AdminGuard from '@/components/admin/AdminGuard'; 
// import Link from 'next/link';

// // Function to generate a simple unique string ID
// const generateUniqueId = () => {
//     return 'prod-' + Date.now() + Math.floor(Math.random() * 1000);
// };

// export default function AddProductPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     // id: '', // Will be generated in handleSubmit
//     name: '',
//     category: 'Dresses',
//     gender: 'Women', // Now only 'Women' or 'Men'
//     availableSizes: 's,m,l,xl', 
//     retailPrice: '', // Now a String
//     actualCost: '', // Now a String
//     color: '', // Now required
//     collection: 'Default', // Now required
//     description: '',
//     img: '', 
//     fabric: '', // New required field
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     // Prepare data
//     const productData = {
//       // 🛑 Critical Change: Generate the required unique ID here
//       id: generateUniqueId(), 
//       ...formData,
//       // Convert sizes to array
//       availableSizes: formData.availableSizes.split(',').map(s => s.trim().toLowerCase()).filter(s => s),
//       // Prices are sent as strings, no need for parseFloat()!
//     };

//     try {
//       await axios.post('/api/admin/products', productData); 
      
//       alert('Product added successfully!');
//       router.push('/admin'); 
//     } catch (err) {
//       console.error('Error adding product:', err);
//       // Display specific server error if available
//       const serverMessage = err.response?.data?.details || 'Check API server logs for details.';
//       setError(`Failed to add product: ${serverMessage}`);
//       setLoading(false);
//     }
//   };

//   return (
//     <AdminGuard>
//       <div className="min-h-screen bg-gray-100 p-8">
//         <div className="container mx-auto max-w-4xl">
//           <header className="flex justify-between items-center mb-8 border-b pb-4">
//             <h1 className="text-3xl font-bold text-gray-800">➕ Add New Product</h1>
//             <Link href="/admin" legacyBehavior>
//               <a className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
//                 ← Back to Dashboard
//               </a>
//             </Link>
//           </header>

//           <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
//             <h2 className="text-xl font-semibold border-b pb-3 mb-5">Product Details</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Product Name & Image URL (Required) */}
//               <label className="block"><span className="text-gray-700">Product Name *</span>
//                 <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//               </label>

//               <label className="block"><span className="text-gray-700">Image URL *</span>
//                 <input type="url" name="img" value={formData.img} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//               </label>
              
//               {/* Category & Gender (Required) */}
//               <label className="block"><span className="text-gray-700">Category *</span>
//                 <select name="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-white">
//                   <option>Dresses</option><option>Sweaters</option><option>Shirts</option><option>Pants</option>
//                 </select>
//               </label>

//               <label className="block"><span className="text-gray-700">Gender *</span>
//                 <select name="gender" value={formData.gender} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-white">
//                   {/* 🛑 Updated options to match model enum */}
//                   <option>Women</option><option>Men</option>
//                 </select>
//               </label>

//               {/* Prices (Required, now String type) */}
//               <label className="block"><span className="text-gray-700">Retail Price (Rs) *</span>
//                 <input type="text" pattern="[0-9]*\.?[0-9]+" name="retailPrice" value={formData.retailPrice} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//               </label>

//               <label className="block"><span className="text-gray-700">Actual Cost (Rs) *</span>
//                 <input type="text" pattern="[0-9]*\.?[0-9]+" name="actualCost" value={formData.actualCost} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//               </label>
              
//               {/* Color and Fabric (Required) */}
//               <label className="block"><span className="text-gray-700">Color *</span>
//                 <input type="text" name="color" value={formData.color} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//               </label>
              
//               <label className="block"><span className="text-gray-700">Fabric *</span>
//                 <input type="text" name="fabric" value={formData.fabric} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//               </label>
              
//               {/* Collection (Required) */}
//               <label className="block"><span className="text-gray-700">Collection *</span>
//                 <input type="text" name="collection" value={formData.collection} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//               </label>
              
//               {/* Available Sizes (Required) */}
//               <label className="block md:col-span-2"><span className="text-gray-700">Available Sizes (Comma-separated: s,m,l) *</span>
//                 <input type="text" name="availableSizes" value={formData.availableSizes} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//               </label>

//               {/* Description (Required) */}
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
//                   loading ? 'bg-indigo-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
//                 }`}
//               >
//                 {loading ? 'Adding Product...' : 'Create Product'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </AdminGuard>
//   );
// }
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import AdminGuard from '@/components/admin/AdminGuard'; 
import Link from 'next/link';

// Function to generate a simple unique string ID
const generateUniqueId = () => 'prod-' + Date.now() + Math.floor(Math.random() * 1000);

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Dresses',
    gender: 'Women',
    availableSizes: 's,m,l,xl', 
    retailPrice: '',
    actualCost: '',
    color: '',
    collection: 'Default',
    description: '',
    img: '', 
    fabric: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const productData = {
      id: generateUniqueId(),
      ...formData,
      availableSizes: formData.availableSizes.split(',').map(s => s.trim().toLowerCase()).filter(s => s),
    };

    try {
      // ✅ Get JWT token from localStorage
      const token = localStorage.getItem('token');
      if (!token) throw new Error('You must be logged in as admin to add products.');

      // ✅ Send token in Authorization header
      await axios.post('/api/admin/products', productData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Product added successfully!');
      router.push('/admin'); 
    } catch (err) {
      console.error('Error adding product:', err);
      const serverMessage = err.response?.data?.message || 'Check API server logs for details.';
      setError(`Failed to add product: ${serverMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="container mx-auto max-w-4xl">
          <header className="flex justify-between items-center mb-8 border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-800">➕ Add New Product</h1>
            <Link href="/admin" legacyBehavior>
              <a className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
                ← Back to Dashboard
              </a>
            </Link>
          </header>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            <h2 className="text-xl font-semibold border-b pb-3 mb-5">Product Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <option>Dresses</option>
                  <option>Sweaters</option>
                  <option>Shirts</option>
                  <option>Pants</option>
                </select>
              </label>

              <label className="block">
                <span className="text-gray-700">Gender *</span>
                <select name="gender" value={formData.gender} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-white">
                  <option>Women</option>
                  <option>Men</option>
                </select>
              </label>

              <label className="block">
                <span className="text-gray-700">Retail Price (Rs) *</span>
                <input type="text" pattern="[0-9]*\.?[0-9]+" name="retailPrice" value={formData.retailPrice} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </label>

              <label className="block">
                <span className="text-gray-700">Actual Cost (Rs) *</span>
                <input type="text" pattern="[0-9]*\.?[0-9]+" name="actualCost" value={formData.actualCost} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </label>

              <label className="block">
                <span className="text-gray-700">Color *</span>
                <input type="text" name="color" value={formData.color} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </label>

              <label className="block">
                <span className="text-gray-700">Fabric *</span>
                <input type="text" name="fabric" value={formData.fabric} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </label>

              <label className="block">
                <span className="text-gray-700">Collection *</span>
                <input type="text" name="collection" value={formData.collection} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </label>

              <label className="block md:col-span-2">
                <span className="text-gray-700">Available Sizes (Comma-separated: s,m,l) *</span>
                <input type="text" name="availableSizes" value={formData.availableSizes} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </label>

              <label className="block md:col-span-2">
                <span className="text-gray-700">Description *</span>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </label>
            </div>

            {error && (<p className="text-red-500 text-sm mt-4">{error}</p>)}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${loading ? 'bg-indigo-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'}`}
              >
                {loading ? 'Adding Product...' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminGuard>
  );
}
