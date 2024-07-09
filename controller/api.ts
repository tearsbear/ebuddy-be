import { Request, Response } from "express";
import ApiError from "../entities/ApiError";
import userCollection from "../repository/userCollection";
import { UpdateUserDataRequestBody } from "../entities/user";

const updateUserData = async (req: Request, res: Response) => {
  try {
    const { userId, displayName, age, profession }: UpdateUserDataRequestBody =
      req.body;
    const userRef = userCollection.doc(userId);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      throw new ApiError(404, "User not found");
    }

    const userData = userSnapshot.data();

    const updateData = {
      displayName: displayName ?? userData?.displayName ?? "",
      age: age ?? userData?.age ?? 0,
      profession: profession ?? userData?.profession ?? "",
    };

    await userRef.update(updateData);
    res.status(200).json({ message: "User data updated successfully" });
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const fetchUserData = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      throw new ApiError(400, "userId is required");
    }

    const userSnapshot = await userCollection.doc(userId).get();

    if (!userSnapshot.exists) {
      throw new ApiError(404, "User not found");
    }

    const userData = userSnapshot.data();
    res.status(200).json({ userData });
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export { updateUserData, fetchUserData };
