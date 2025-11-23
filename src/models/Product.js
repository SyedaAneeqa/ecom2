import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Women', 'Men'], 
  },
  availableSizes: {
    type: [String], 
    required: true,
  },
  retailPrice: { 
    type: String, 
    required: true,
  },
  actualCost: { 
    type: String, 
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  collection: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  // 🆕 NEW FIELD ADDED HERE
  fabric: {
    type: String,
    required: true, // Assuming every product must have a fabric category
    // Optional: Add an enum here to restrict to the 5 categories if desired
    // enum: ['Knit', 'Felt', 'Satin', 'Viscose', 'Cotton'], 
  },
}, {
  timestamps: true 
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
