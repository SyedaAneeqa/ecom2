// // src/pages/api/admin/products.js
// import connectDB from '@/utils/db';
// import Product from '@/models/Product';
// import User from '@/models/User';
// import jwt from 'jsonwebtoken';

// export default async function handler(req, res) {
//   await connectDB();

//   // ✅ Extract user from JWT
//   let user = null;
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ message: 'Unauthorized: No token provided' });
//     }

//     const token = authHeader.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     user = await User.findById(decoded.id);

//     if (!user || !user.isAdmin) {
//       return res.status(403).json({ message: 'Forbidden: Admins only' });
//     }
//   } catch (err) {
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }

//   switch (req.method) {
//     case 'GET':
//       try {
//         const products = await Product.find({});
//         res.status(200).json({ products });
//       } catch (error) {
//         res.status(500).json({ message: 'Error fetching products' });
//       }
//       break;

//     case 'POST':
//       try {
//         const newProduct = new Product(req.body);
//         await newProduct.save();
//         res.status(201).json({ message: 'Product created successfully', product: newProduct });
//       } catch (error) {
//         res.status(400).json({ message: 'Error creating product', error });
//       }
//       break;

//     case 'PUT':
//       try {
//         const { _id, ...updateData } = req.body;
//         const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, { new: true });
//         if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
//         res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
//       } catch (error) {
//         res.status(400).json({ message: 'Error updating product', error });
//       }
//       break;

//     case 'DELETE':
//       try {
//         const { id } = req.query;
//         const deletedProduct = await Product.findByIdAndDelete(id);
//         if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
//         res.status(200).json({ message: 'Product deleted successfully' });
//       } catch (error) {
//         res.status(500).json({ message: 'Error deleting product' });
//       }
//       break;

//     default:
//       res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
// import connectDB from '@/utils/db';
// import Product from '@/models/Product';
// import User from '@/models/User';
// import jwt from 'jsonwebtoken';

// export default async function handler(req, res) {
//   await connectDB();

//   // ✅ Extract user from JWT (Authentication and Authorization Guard)
//   let user = null;
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ message: 'Unauthorized: No token provided' });
//     }

//     const token = authHeader.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     user = await User.findById(decoded.id);

//     if (!user || !user.isAdmin) {
//       return res.status(403).json({ message: 'Forbidden: Admins only' });
//     }
//   } catch (err) {
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }

//   switch (req.method) {
//     case 'GET':
//       try {
//         const products = await Product.find({});
//         res.status(200).json({ products });
//       } catch (error) {
//         res.status(500).json({ message: 'Error fetching products' });
//       }
//       break;

//     case 'POST':
//       try {
//         const newProduct = new Product(req.body);
//         await newProduct.save();
//         res.status(201).json({ message: 'Product created successfully', product: newProduct });
//       } catch (error) {
//         res.status(400).json({ message: 'Error creating product', error });
//       }
//       break;

//     case 'PUT':
//       try {
//         const { _id, ...updateData } = req.body;
//         const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, { new: true });
//         if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
//         res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
//       } catch (error) {
//         res.status(400).json({ message: 'Error updating product', error });
//       }
//       break;

//     // 🟢 NEW CASE: Handle PATCH request for Discount Update
//     case 'PATCH':
//       try {
//         const { id } = req.query;
//         // Expecting 'discountPercentage' in the request body
//         const { discountPercentage } = req.body; 

//         if (discountPercentage === undefined) {
//           return res.status(400).json({ message: 'Missing discountPercentage field' });
//         }

//         // Validate the discount value (0-100)
//         const discountValue = parseFloat(discountPercentage);
//         if (isNaN(discountValue) || discountValue < 0 || discountValue > 100) {
//           return res.status(400).json({ message: 'Invalid discount percentage value' });
//         }

//         const updatedProduct = await Product.findByIdAndUpdate(
//           id,
//           { discountPercentage: discountValue }, // Only update the discount field
//           { new: true, runValidators: true } // Return the updated document and run schema validators
//         );

//         if (!updatedProduct) {
//           return res.status(404).json({ message: 'Product not found' });
//         }
        
//         res.status(200).json({ 
//           message: 'Discount updated successfully', 
//           product: updatedProduct 
//         });
//       } catch (error) {
//         console.error('Error applying discount:', error);
//         res.status(500).json({ message: 'Error applying discount', error });
//       }
//       break;

//     case 'DELETE':
//       try {
//         const { id } = req.query;
//         const deletedProduct = await Product.findByIdAndDelete(id);
//         if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
//         res.status(200).json({ message: 'Product deleted successfully' });
//       } catch (error) {
//         res.status(500).json({ message: 'Error deleting product' });
//       }
//       break;

//     default:
//       res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };
// src/pages/api/products.js (NEW FILE - Public Access)

// import connectDB from '@/utils/db';
// import Product from '@/models/Product';

// export default async function handler(req, res) {
//   // Ensure we are only responding to GET requests for public listing
//   if (req.method !== 'GET') {
//     res.setHeader('Allow', ['GET']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }

//   await connectDB();

//   try {
//     // 💡 Fetch all products, including the discountPercentage field
//     // No authentication or authorization checks are needed here.
//     const products = await Product.find({}); 
    
//     // Sort by creation date (optional, for better display order)
//     // .sort({ createdAt: -1 }); 

//     res.status(200).json({ products });
//   } catch (error) {
//     console.error('Error fetching public products:', error);
//     res.status(500).json({ message: 'Error fetching products from database' });
//   }
// };
// src/pages/api/products.js (Optimized Public Access)

// import connectDB from '@/utils/db';
// import Product from '@/models/Product';

// export default async function handler(req, res) {
//   // Ensure we are only responding to GET requests for public listing
//   if (req.method !== 'GET') {
//     res.setHeader('Allow', ['GET']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }

//   await connectDB();

//   try {
//     // 💡 Performance Optimization: Select only the fields needed for the Card component
//     // This reduces the data load, speeding up the API response.
//     const products = await Product.find({})
//       .select('id name description img retailPrice discountPercentage availableSizes category gender color fabric collection')
//       // 💡 Added default sorting (e.g., newest first)
//       .sort({ createdAt: -1 }); 

//     // 💡 Ensure MongoDB '_id' is converted to 'id' for frontend consistency
//     const formattedProducts = products.map(product => ({
//       ...product._doc,
//       id: product._id.toString(), // Convert ObjectId to string
//       _id: undefined, // Remove the original _id field
//     }));

//     res.status(200).json({ products: formattedProducts });
    
//   } catch (error) {
//     console.error('Error fetching public products:', error);
//     // Return a generic 500 message to the client
//     res.status(500).json({ message: 'Internal server error while retrieving products.' });
//   }
// };
// import connectDB from '@/utils/db';
// import Product from '@/models/Product';

// export default async function handler(req, res) {
//   await connectDB();

//   const { method } = req;
//   const { id } = req.query;

//   if (method === 'GET') {
//     // Get all products
//     try {
//       const products = await Product.find({})
//         .select('id name description img retailPrice actualCost discountPercentage availableSizes category gender color fabric collection')
//         .sort({ createdAt: -1 });

//       const formattedProducts = products.map(product => ({
//         ...product._doc,
//         id: product._id.toString(),
//         _id: undefined
//       }));

//       return res.status(200).json({ products: formattedProducts });
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Error fetching products' });
//     }
//   }

//   if (method === 'PATCH') {
//     // Apply discount
//     const { discountPercentage } = req.body;
//     if (!id || discountPercentage == null) return res.status(400).json({ message: 'Invalid request' });

//     try {
//       const product = await Product.findById(id);
//       if (!product) return res.status(404).json({ message: 'Product not found' });

//       const discount = parseFloat(discountPercentage) || 0;

//       // Update discount and retail price
//       product.discountPercentage = discount;
//       product.retailPrice = product.actualCost * (1 - discount / 100);

//       await product.save();

//       return res.status(200).json({ message: 'Discount applied successfully', product });
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Error applying discount' });
//     }
//   }

//   if (method === 'DELETE') {
//     // Delete product
//     try {
//       await Product.findByIdAndDelete(id);
//       return res.status(200).json({ message: 'Product deleted successfully' });
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Error deleting product' });
//     }
//   }

//   res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
//   res.status(405).end(`Method ${method} Not Allowed`);
// }

// src/pages/api/admin/products.js
import connectDB from '@/utils/db';
import Product from '@/models/Product';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await connectDB();

  // ✅ Extract user from JWT
  let user = null;
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    user = await User.findById(decoded.id);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const products = await Product.find({});
        res.status(200).json({ products });
      } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
      }
      break;

    case 'POST':
      try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
      } catch (error) {
        res.status(400).json({ message: 'Error creating product', error });
      }
      break;

    case 'PUT':
      try {
        const { _id, ...updateData } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
      } catch (error) {
        res.status(400).json({ message: 'Error updating product', error });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
