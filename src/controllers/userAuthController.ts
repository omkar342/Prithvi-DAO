import { Request, Response } from "express";

import registerNewUser from "../services/authServices";

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const savedUser = await registerNewUser(email, password);

    res.status(201).json({ user: savedUser });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

export default registerUser;
