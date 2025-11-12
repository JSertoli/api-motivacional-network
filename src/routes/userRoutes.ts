import { Router } from "express";
import { getUsers, createUser, updateUser, deleteUser, login } from "../controllers/userController";

const router = Router();
router.get("/", getUsers);
router.post("/register", createUser);
router.post("/login", login);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
export default router;
