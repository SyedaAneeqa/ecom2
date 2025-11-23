// import dbConnect from '@/utils/db';
// import Review from '@/models/Review';

// export default async function handler(req, res) {
//   // Only allow GET requests
//   if (req.method !== 'GET') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   try {
//     // Connect to database
//     await dbConnect();

//     // Fetch all reviews
//     const reviews = await Review.find().sort({ date: -1 }); // latest first

//     res.status(200).json({
//       success: true,
//       reviews: reviews.map(r => ({
//         _id: r._id,
//         productId: r.productId,
//         name: r.name,
//         rating: r.rating,
//         text: r.text,
//         date: r.date,
//       })),
//     });
//   } catch (err) {
//     console.error('Error fetching reviews:', err);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// }
import dbConnect from '@/utils/db';
import Review from '@/models/Review'; // Assuming this imports the model with createdAt field

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Connect to database
    await dbConnect();

    // 1. 🟢 FIX: Sort by 'createdAt' (latest first)
    const reviews = await Review.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews: reviews.map(r => ({
        _id: r._id,
        productId: r.productId,
        name: r.name,
        rating: r.rating,
        text: r.text,
        // 2. 🟢 FIX: Use 'createdAt' and convert it to a parsable ISO string
        date: r.createdAt ? r.createdAt.toISOString() : null, 
      })),
    });
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}