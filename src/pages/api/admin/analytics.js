import dbConnect from '@/utils/db';
import Order from '@/models/Order';
import Product from '@/models/Product';

export default async function handler(req, res) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' });

  try {
    await dbConnect();

    // Get only dispatched orders
    const orders = await Order.find({ status: 'Dispatched' });

    const items = [];

    for (const order of orders) {
      for (const p of order.products) {
        // Fetch full product info from Products collection
        const product = await Product.findOne({ id: p.id });
        if (!product) continue;

        const profit =
          (Number(product.retailPrice) - Number(product.actualCost)) *
          (p.quantity || 1);

        items.push({
          profit,
          gender: product.gender || 'Unknown',
          fabric: product.fabric || 'Unknown',
          category: product.category || 'Unknown',
          season: product.collection || 'Unknown',
        });
      }
    }

    const aggregateBy = (key) => {
      const result = {};
      items.forEach((item) => {
        const k = item[key];
        if (!result[k]) result[k] = 0;
        result[k] += item.profit;
      });
      return Object.entries(result).map(([key, totalProfit]) => ({
        key,
        totalProfit,
      }));
    };

    const analytics = {
      genderProfit: aggregateBy('gender'),
      fabricProfit: aggregateBy('fabric'),
      categoryProfit: aggregateBy('category'),
      seasonProfit: aggregateBy('season'),
    };

    res.status(200).json({ success: true, analytics });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
