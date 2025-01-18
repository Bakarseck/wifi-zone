import jwt from "jsonwebtoken";

export function verifyToken(req) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Authorization token missing.");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // This contains the payload (e.g., user ID, email)
  } catch (error) {
    throw new Error("Invalid or expired token.");
  }
}
