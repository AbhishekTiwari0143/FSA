import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { carRegister } from "../controller/carsController.js";

const router = express.Router();

router.route("/car").post(authenticate, authorizeAdmin, carRegister);

export default router;
