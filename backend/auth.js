import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
import cookieParser from "cookie-parser";

export default function authMiddleware(req, res, next) {
  const authHeader = req.cookies.token;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized access!" });
  }

  try {
    const decoded = jwt.verify(authHeader, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token!" });

  }
}
