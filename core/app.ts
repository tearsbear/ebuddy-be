import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import userRoutes from "../routes/userRoutes";
import ApiError from "../entities/ApiError";

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS for all origins (adjust for production)
app.use(cors());

// Mount user routes
app.use("/api", userRoutes);

// Global error handling middleware (improved)
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (err instanceof ApiError) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      console.error(err.stack); // Log the error for debugging
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Export the Cloud Function
export const api = functions.https.onRequest(app);
