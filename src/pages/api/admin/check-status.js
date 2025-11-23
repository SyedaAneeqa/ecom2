// src/pages/api/admin/check-status.js
import connectDB from '@/utils/db';
import User from '@/models/User';

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    const user = await User.findById(userId).select('isAdmin name email');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ isAdmin: user.isAdmin, name: user.name, email: user.email });
  } catch (error) {
    console.error('Error checking admin status:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
