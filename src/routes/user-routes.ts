import express from "express";

import registerUser from "../controllers/userAuthController";

const router = express.Router();

router.post("/", registerUser);

export default router;