// pages/api/seed.js

import dbConnect from '@/utils/db'; // Correct path to your DB utility
import Product from '@/models/Product';
// 💡 IMPORTANT: Import your local JSON file directly
import cardData from '@/store/cardData.json'; // Adjust this path if your JSON is elsewhere

export default async function handler(req, res) {
  // Only allow POST or a secure method for seeding
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // Use GET for simple browser testing, but POST is safer/better practice
  if (req.method === 'GET' || req.method === 'POST') {
    await dbConnect();

    try {
      // 1. Optional: Clear the collection first to ensure a clean slate
      // Highly recommended for a seeding operation.
      await Product.deleteMany({});
      console.log("Existing products cleared.");

      // 2. Insert the data array using Mongoose's insertMany
      const result = await Product.insertMany(cardData);
      
      console.log(`Successfully inserted ${result.length} products.`);

      return res.status(201).json({ 
        success: true, 
        message: `Database seeded successfully. ${result.length} products added.`,
        count: result.length
      });

    } catch (error) {
      // Handle Mongoose or other insertion errors
      console.error('API Data Seeding Failed:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Data insertion failed. Check console for details.',
        error: error.message 
      });
    }
  }
}