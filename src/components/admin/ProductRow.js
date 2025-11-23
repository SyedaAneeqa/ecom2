// src/components/admin/ProductRow.js
import Link from 'next/link';

export default function ProductRow({ product, onDelete }) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <img src={product.img} alt={product.name} className="h-12 w-12 object-cover rounded" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {product.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.category} / {product.gender}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        Retail: ${product.retailPrice} / Cost: ${product.actualCost}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Link href={`/admin/edit-product/${product._id}`} legacyBehavior>
          <a className="text-indigo-600 hover:text-indigo-900 mr-4">
            Edit
          </a>
        </Link>
        <button
          onClick={() => onDelete(product._id)}
          className="text-red-600 hover:text-red-900"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}


//       <td className="px-6 py-4 whitespace-nowrap">
//         {/* Assuming 'img' is the correct field name for the image URL */}
//         <img src={product.img} alt={product.name} className="h-12 w-12 object-cover rounded" />
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//         {product.name}
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//         {product.category} / {product.gender}
//       </td>
//       {/* 💡 Updated column to include discount percentage display */}
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//         Retail: ${product.retailPrice} / Cost: ${product.actualCost}
//         <span className="ml-2 font-semibold text-red-600">
//           ({discount}%)
//         </span>
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//         <Link href={`/admin/edit-product/${product._id}`} legacyBehavior>
//           <a className="text-indigo-600 hover:text-indigo-900 mr-4">
//             Edit
//           </a>
//         </Link>
        
//         {/* 🟢 NEW: Discount Button calls the handler, passing the entire product object */}
//         <button
//           onClick={() => onDiscount(product)}
//           className="text-green-600 hover:text-green-900 mr-4" // Added mr-4 for spacing
//         >
//           Discount
//         </button>
        
//         <button
//           onClick={() => onDelete(product._id)}
//           className="text-red-600 hover:text-red-900"
//         >
//           Delete
//         </button>
//       </td>
//     </tr>
//   );
// }
// src/components/admin/ProductRow.js (Updated Code)

// import Link from 'next/link';

// export default function ProductRow({ product, onDelete, onDiscount }) {
//   // 1. 🟢 FIX: Ensure all raw price data is treated as a number (defaulting to 0 if invalid/missing)
//   const retailPrice = parseFloat(product.retailPrice) || 0;
//   const actualCost = parseFloat(product.actualCost) || 0;
//   const discount = parseFloat(product.discountPercentage) || 0;
  
//   // Calculate the discounted price
//   const discountedPrice = retailPrice * (1 - (discount / 100));

//   // 2. 🟢 FIX: Robust helper to format currency
//   // This helper is now safer because the input prices (above) are already cleaned.
//   const formatCurrency = (price) => {
//     // We can rely on price being a number here, but we'll use a final check just in case
//     const numericPrice = parseFloat(price) || 0;
//     return numericPrice.toFixed(2);
//   };// src/components/admin/ProductRow.js
// import Link from 'next/link';

// // 💡 Accept the new 'onDiscount' prop
// export default function ProductRow({ product, onDelete, onDiscount }) {
//   // Helper to safely display the discount percentage
//   const discount = product.discountPercentage || 0;

//   return (
//     <tr>

//   return (
//     <tr>
//       <td className="px-6 py-4 whitespace-nowrap">
//         {/* Assuming 'img' is the correct field name for the image URL */}
//         <img src={product.img} alt={product.name} className="h-12 w-12 object-cover rounded" />
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//         {product.name}
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//         {product.category} / {product.gender}
//       </td>
      
//       {/* Updated Price column to show Original/Discounted Price */}
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//         <div>Cost: ${formatCurrency(actualCost)}</div>
//         {discount > 0 ? (
//           <div>
//             {/* Original price (crossed out) */}
//             <span className="line-through text-gray-400 mr-2">
//               ${formatCurrency(retailPrice)}
//             </span>
//             {/* Discounted price (highlighted) */}
//             <span className="font-semibold text-red-600">
//               ${formatCurrency(discountedPrice)}
//             </span>
//             <span className="ml-2 text-xs text-green-600">
//               ({formatCurrency(discount)}%)
//             </span>
//           </div>
//         ) : (
//           // Display only the retail price if no discount is applied
//           <div>Retail: ${formatCurrency(retailPrice)}</div>
//         )}
//       </td>
      
//       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//         <Link href={`/admin/edit-product/${product._id}`} legacyBehavior>
//           <a className="text-indigo-600 hover:text-indigo-900 mr-4">
//             Edit
//           </a>
//         </Link>
        
//         <button
//           onClick={() => onDiscount(product)}
//           className="text-green-600 hover:text-green-900 mr-4"
//         >
//           Discount
//         </button>
        
//         <button
//           onClick={() => onDelete(product._id)}
//           className="text-red-600 hover:text-red-900"
//         >
//           Delete
//         </button>
//       </td>
//     </tr>
//   );
// }