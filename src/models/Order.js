import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
    id: { type: String, required: true },
    tempId: { type: String, required: true }, // The unique cart identifier (product ID + size)
    name: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true } // Total price for this line item
});

const OrderSchema = new mongoose.Schema({
    // User information captured at checkout
    userInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
        // If you integrate with Clerk user ID, add: clerkUserId: String
    },
    // The list of products in the order
    products: [OrderItemSchema], 
    
    totalAmount: {
        type: Number,
        required: true
    },
    
    // Status can be used for tracking (e.g., 'Pending', 'Processing', 'Shipped', 'Delivered')
    status: {
        type: String,
        default: 'Pending'
    },
    
    // date field is automatically handled by the timestamp, but we'll keep one for clarity
    orderDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Adds createdAt (Order Date) and updatedAt fields
});

// Export the model
export default mongoose.models.Order || mongoose.model('Order', OrderSchema);