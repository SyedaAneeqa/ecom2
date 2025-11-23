// import dbConnect from "@/utils/db";
// import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema({
//   productId: { type: String, required: true },
//   name: { type: String, required: true },
//   rating: { type: Number, required: true },
//   text: { type: String, required: true },
//   date: { type: Date, default: Date.now },
// });

// const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

// export default async function handler(req, res) {
//   await dbConnect();
//   const { id } = req.query;

//   if (req.method === "GET") {
//     try {
//       const reviews = await Review.find({ productId: id }).sort({ date: -1 });
//       res.status(200).json({ success: true, reviews });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ success: false, message: "Failed to fetch reviews" });
//     }
//   } else if (req.method === "POST") {
//     const { name, rating, text } = req.body;
//     if (!name || !rating || !text) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }
//     try {
//       const newReview = await Review.create({ productId: id, name, rating, text });
//       res.status(201).json({ success: true, review: newReview });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ success: false, message: "Failed to submit review" });
//     }
//   } else {
//     res.setHeader("Allow", ["GET", "POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
// import dbConnect from "@/utils/db";
// import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema({
//   productId: { type: String, required: true },
//   name: { type: String, required: true },
//   rating: { type: Number, required: true },
//   text: { type: String, required: true },
//   date: { type: Date, default: Date.now },
// });

// const Review =
//   mongoose.models.Review || mongoose.model("Review", reviewSchema);

// export default async function handler(req, res) {
//   await dbConnect();
//   const { id } = req.query;

//   if (req.method === "GET") {
//     try {
//       const reviews = await Review.find({ productId: id }).sort({ date: -1 });

//       res.status(200).json({
//         success: true,
//         reviews,
//       });
//     } catch (err) {
//       console.error(err);
//       res
//         .status(500)
//         .json({ success: false, message: "Failed to fetch reviews" });
//     }
//   }

//   else if (req.method === "POST") {
//     const { name, rating, text } = req.body;

//     if (!name || !rating || !text) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields",
//       });
//     }

//     try {
//       const newReview = await Review.create({
//         productId: id,
//         name,
//         rating,
//         text,
//         date: new Date(), // ✅ ensure date is ALWAYS added
//       });

//       res.status(201).json({
//         success: true,
//         review: newReview,
//       });
//     } catch (err) {
//       console.error(err);
//       res
//         .status(500)
//         .json({ success: false, message: "Failed to submit review" });
//     }
//   }

//   else {
//     res.setHeader("Allow", ["GET", "POST"]);
//     res.status(405).json({
//       success: false,
//       message: `Method ${req.method} not allowed`,
//     });
//   }
// }
// /api/reviews/[id].js
// /api/reviews/[id].js
// import dbConnect from "@/utils/db";
// import mongoose from "mongoose";

// // ---------------- Mongoose Schema ----------------
// const reviewSchema = new mongoose.Schema({
//   productId: { type: String, required: true },
//   name: { type: String, required: true },
//   rating: { type: Number, required: true },
//   text: { type: String, required: true },
//   date: { type: Date, default: Date.now }, 
// });

// // Use existing model if exists, else create
// const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

// // ---------------- API Handler ----------------
// export default async function handler(req, res) {
//   await dbConnect();
  
//   // FIX: Access the parameter using 'id' (from [id].js file name)
//   const { id } = req.query;

//   // FIX: Guard clause to prevent TypeError if 'id' is undefined
//   if (!id) {
//     return res.status(400).json({ 
//       success: false, 
//       message: "Product ID is required." 
//     });
//   }

//   // --------------- GET REVIEWS (Fetch all reviews for a product) ---------------
//   if (req.method === "GET") {
//     try {
//       const reviews = await Review.find({ productId: id }).sort({ date: -1 });

//       const formattedReviews = reviews.map(r => ({
//         _id: r._id,
//         productId: r.productId,
//         name: r.name,
//         rating: r.rating,
//         text: r.text,
//         // Ensure date is a valid ISO string
//         date: (r.date && r.date instanceof Date) 
//           ? r.date.toISOString() 
//           : new Date().toISOString(), 
//       }));

//       return res.status(200).json({ success: true, reviews: formattedReviews });
//     } catch (err) {
//       console.error("GET Reviews Error:", err);
//       return res.status(500).json({ success: false, message: "Failed to fetch reviews" });
//     }
//   }

//   // --------------- POST REVIEW (Submit a new review) ---------------
//   else if (req.method === "POST") {
//     const { name, rating, text } = req.body;

//     if (!name || !rating || !text) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     try {
//       const newReview = await Review.create({
//         productId: id, // Use the extracted 'id' from req.query
//         name,
//         rating,
//         text,
//         date: new Date(), 
//       });

//       // Return the new review object with the date formatted as ISO string
//       return res.status(201).json({
//         success: true,
//         review: {
//           _id: newReview._id,
//           productId: newReview.productId,
//           name: newReview.name,
//           rating: newReview.rating,
//           text: newReview.text,
//           date: newReview.date.toISOString(), 
//         },
//       });
//     } catch (err) {
//       console.error("POST Review Error:", err);
//       return res.status(500).json({ success: false, message: " submit review" }); 
//     }
//   }

//   // --------------- METHOD NOT ALLOWED ---------------
//   else {
//     res.setHeader("Allow", ["GET", "POST"]);
//     return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
//   }
// }

// import dbConnect from "@/utils/db";
// import mongoose from "mongoose";

// // ---------------- Mongoose Schema ----------------
// const reviewSchema = new mongoose.Schema({
//   productId: { type: String, required: true },
//   name: { type: String, required: true },
//   rating: { type: Number, required: true },
//   text: { type: String, required: true },
//   date: { type: Date, default: Date.now },
// });

// const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

// // ---------------- API Handler ----------------
// export default async function handler(req, res) {
//   await dbConnect();
//   const { id } = req.query;

//   if (!id) {
//     return res.status(400).json({ success: false, message: "Product ID is required." });
//   }

//   // --------------- GET REVIEWS ---------------
//   if (req.method === "GET") {
//     try {
//       const reviews = await Review.find({ productId: id }).sort({ date: -1 });

//       const formattedReviews = reviews.map(r => ({
//         _id: r._id,
//         productId: r.productId,
//         name: r.name,
//         rating: r.rating,
//         text: r.text,
//         date: r.date instanceof Date ? r.date.toISOString() : new Date().toISOString(),
//       }));

//       return res.status(200).json({ success: true, reviews: formattedReviews });
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ success: false, message: "Failed to fetch reviews" });
//     }
//   }

//   // --------------- POST REVIEW ---------------
//   else if (req.method === "POST") {
//     const { name, rating, text } = req.body;

//     if (!name || !rating || !text) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     try {
//       const newReview = await Review.create({ productId: id, name, rating, text });

//       // Return the new review with formatted date
//       return res.status(201).json({
//         success: true,
//         review: {
//           _id: newReview._id,
//           productId: newReview.productId,
//           name: newReview.name,
//           rating: newReview.rating,
//           text: newReview.text,
//           date: newReview.date.toISOString(), // only difference: formatted date
//         },
//       });
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ success: false, message: "submit review" });
//     }
//   }

//   // --------------- METHOD NOT ALLOWED ---------------
//   else {
//     res.setHeader("Allow", ["GET", "POST"]);
//     return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
//   }
// }
import dbConnect from "@/utils/db";
import mongoose from "mongoose";

// ---------------- Mongoose Schema ----------------
const reviewSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }, // optional, stored but not formatted
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

// ---------------- API Handler ----------------
export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ success: false, message: "Product ID is required." });
  }

  // --------------- GET REVIEWS ---------------
  if (req.method === "GET") {
    try {
      const reviews = await Review.find({ productId: id }).sort({ date: -1 });
      res.status(200).json({ success: true, reviews }); // no date formatting
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Failed to fetch reviews" });
    }
  }

  // --------------- POST REVIEW ---------------
  else if (req.method === "POST") {
    const { name, rating, text } = req.body;

    if (!name || !rating || !text) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
      const newReview = await Review.create({ productId: id, name, rating, text });
      res.status(201).json({ success: true, review: newReview }); // returns review as-is
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Failed to submit review" });
    }
  }

  // --------------- METHOD NOT ALLOWED ---------------
  else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
