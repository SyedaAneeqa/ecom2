// pages/api/order/create.js

import dbConnect from '@/utils/db'; // Your existing DB connection utility
import Order from '@/models/Order'; // The new Order model

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    await dbConnect();

    try {
        const { userInfo, products, total } = req.body;
        
        if (!userInfo || !products || products.length === 0 || total === undefined) {
             return res.status(400).json({ success: false, message: 'Missing required order data.' });
        }

        const orderData = {
            userInfo: userInfo,
            // address: customerAddress, // ✅ from input field
            // phone: customerPhone,      // ✅ from input field,
            products: products,
            totalAmount: total,
            // Status defaults to 'Pending' in the model
        };

        // Create the new order document in the database
        const newOrder = await Order.create(orderData);

        // Success response
        res.status(201).json({ 
            success: true, 
            message: 'Order placed successfully.',
            data: newOrder 
        });

    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ success: false, message: 'Failed to place order due to a server error.' });
    }
}