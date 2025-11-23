import dbConnect from '@/utils/db';
import Order from '@/models/Order';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'PATCH') {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status required' });
    }

    try {
      const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
      res.status(200).json({ success: true, order });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
