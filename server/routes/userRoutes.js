import { Router } from "express";
import { verifyToken } from "../utils/auth.js";
import {
  userRegister,
  userLogin,
  logoutCurrentUser,
} from "../controller/userController.js";

const router = Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", logoutCurrentUser);

// router.post("/admin");

router.get("/profile", verifyToken, async (req, res) => {
  try {
    // User information is available in req.user after token verification
    res.json({ user: req.user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
export default router;
