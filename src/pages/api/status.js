// pages/api/status.js

// Go up one level (from 'api' to 'pages') -> '../'
// Then go down into the 'utils' folder -> 'utils/db'

import dbConnect from '@/utils/db'; 

export default async function handler(req, res) {
  try {
    // This will now successfully find and execute your dbConnect function
    await dbConnect();
    
    res.status(200).json({ status: 'Database is connected. Check your terminal for logs.' });
  } catch (error) {
    res.status(500).json({ 
      status: 'Database connection failed', 
      error: error.message 
    });
  }
}