import express from "express";
import { register, login, setAvatar, getAllOtherUsers } from "../controllers/userController.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/setAvatar/:id", setAvatar);
router.get("/getAllOtherUsers/:id", getAllOtherUsers);

export default router;