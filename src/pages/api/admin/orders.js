import dbConnect from '@/utils/db'; // Make sure this connects to MongoDB
import Order from '@/models/Order';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    const orders = await Order.find().sort({ createdAt: -1 }); // latest orders first
    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
