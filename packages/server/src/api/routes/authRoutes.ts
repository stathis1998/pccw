import express from "express";

import { register, login, validate } from "../controllers/authController";
import { validateData } from "../middlewares/validationMiddleware";
import {
  userRegistrationSchema,
  userLoginSchema,
} from "../../schemas/userShcema";

const router = express.Router();

router.post("/register", validateData(userRegistrationSchema), register);
router.post("/login", validateData(userLoginSchema), login);
router.post("/validate", validate);

export default router;
