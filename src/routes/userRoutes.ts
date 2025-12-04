import { Router } from "express";
import { getUsers, createUser, updateUser, deleteUser, login } from "../controllers/userController";
import { verifyToken } from "../middleware/verifyToken";
import { onlySelf } from "../middleware/onlySelf";

const router = Router();
router.get("/", getUsers);
router.post("/register", createUser);
router.post("/login", login);
router.put("/:id", verifyToken, onlySelf, updateUser);
router.delete("/:id", verifyToken, onlySelf, deleteUser);

export default router;
