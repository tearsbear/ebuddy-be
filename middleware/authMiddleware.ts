import { Request, Response, NextFunction } from "express";
import ApiError from "../entities/ApiError";

const HARDCODED_ID_TOKEN = "id2024";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;

    // Check if the Authorization header exists
    if (!authorizationHeader) {
      // Throw an error if no Authorization header is provided
      throw new ApiError(401, "Unauthorized: No token provided");
    }

    // Extract the token from the Authorization header
    const idToken = authorizationHeader.split("Bearer ")[1];

    // Compare with the hardcoded token
    if (idToken !== HARDCODED_ID_TOKEN) {
      // Throw an error if the tokens don't match
      throw new ApiError(401, "Unauthorized: Invalid token");
    }

    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    // Handle errors (ApiError or other types)
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export default authMiddleware;
