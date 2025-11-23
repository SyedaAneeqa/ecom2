import connectDB from '@/utils/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await connectDB();

  // ✅ Authenticate admin using JWT
  let adminUser = null;
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    adminUser = await User.findById(decoded.id);

    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const users = await User.find({}).select('-password'); // Exclude passwords
        res.status(200).json({ users });
      } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
      }
      break;

    case 'PUT':
      try {
        const { _id, name, email, isAdmin } = req.body;

        if (!_id) return res.status(400).json({ message: 'User ID is required' });

        const updatedUser = await User.findByIdAndUpdate(
          _id,
          { name, email, isAdmin },
          { new: true }
        ).select('-password');

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
      } catch (error) {
        res.status(400).json({ message: 'Error updating user', error });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ message: 'User ID is required' });

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
