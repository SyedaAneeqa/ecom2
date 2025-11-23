// // src/pages/api/admin/products.js
// import connectDB from '@/utils/db';
// import Product from '@/models/Product';
// import User from '@/models/User';
// import jwt from 'jsonwebtoken';

// export default async function handler(req, res) {
//   await connectDB();

//   // ✅ Extract user from JWT
//   let user = null;
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ message: 'Unauthorized: No token provided' });
//     }

//     const token = authHeader.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     user = await User.findById(decoded.id);

//     if (!user || !user.isAdmin) {
//       return res.status(403).json({ message: 'Forbidden: Admins only' });
//     }
//   } catch (err) {
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }

//   switch (req.method) {
//     case 'GET':
//       try {
//         const products = await Product.find({});
//         res.status(200).json({ products });
//       } catch (error) {
//         res.status(500).json({ message: 'Error fetching products' });
//       }
//       break;

//     case 'POST':
//       try {
//         const newProduct = new Product(req.body);
//         await newProduct.save();
//         res.status(201).json({ message: 'Product created successfully', product: newProduct });
//       } catch (error) {
//         res.status(400).json({ message: 'Error creating product', error });
//       }
//       break;

//     case 'PUT':
//       try {
//         const { _id, ...updateData } = req.body;
//         const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, { new: true });
//         if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
//         res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
//       } catch (error) {
//         res.status(400).json({ message: 'Error updating product', error });
//       }
//       break;

//     case 'DELETE':
//       try {
//         const { id } = req.query;
//         const deletedProduct = await Product.findByIdAndDelete(id);
//         if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
//         res.status(200).json({ message: 'Product deleted successfully' });
//       } catch (error) {
//         res.status(500).json({ message: 'Error deleting product' });
//       }
//       break;

//     default:
//       res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };
// src/pages/api/admin/products.js
import connectDB from '@/utils/db';
import Product from '@/models/Product';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await connectDB();

  // ✅ Only enforce JWT/admin check for POST, PUT, DELETE
  const protectedMethods = ['POST', 'PUT', 'DELETE'];
  let user = null;

  if (protectedMethods.includes(req.method)) {
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
  }

  switch (req.method) {
    case 'GET':
      try {
        const products = await Product.find({});
        return res.status(200).json({ products });
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching products' });
      }

    case 'POST':
      try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        return res.status(201).json({ message: 'Product created successfully', product: newProduct });
      } catch (error) {
        return res.status(400).json({ message: 'Error creating product', error });
      }

    case 'PUT':
      try {
        const { _id, ...updateData } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        return res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
      } catch (error) {
        return res.status(400).json({ message: 'Error updating product', error });
      }

    case 'DELETE':
      try {
        const { id } = req.query;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        return res.status(200).json({ message: 'Product deleted successfully' });
      } catch (error) {
        return res.status(500).json({ message: 'Error deleting product' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
