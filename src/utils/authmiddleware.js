import jwt from "jsonwebtoken";

export function verifyToken(req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token" });
    throw new Error("No token provided");
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
    throw err;
  }
}
