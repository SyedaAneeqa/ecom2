// {
//2
// import dbConnect from "@/utils/db";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export default async function handler(req, res) {
//   if (req.method !== "POST")
//     return res.status(405).json({ message: "Method not allowed" });

//   const { email, password } = req.body;

//   if (!email || !password)
//     return res.status(400).json({ message: "Missing fields" });

//   await dbConnect();

//   const user = await User.findOne({ email });
//   if (!user) return res.status(404).json({ message: "User not found" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(401).json({ message: "Invalid password" });

//   // ✅ Sign JWT token
//   const token = jwt.sign(
//     { id: user._id, email: user.email, isAdmin: user.isAdmin },
//     process.env.JWT_SECRET,
//     { expiresIn: "7d" }
//   );

//   // ✅ Return both token and user info
//   res.status(200).json({
//     message: "Login successful",
//     token,
//     user: {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//     },
//   });
// }
import dbConnect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Missing fields" });

  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });

  // ✅ Sign JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // ✅ Return both token and user info
  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
}
