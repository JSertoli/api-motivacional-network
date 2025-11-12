import { Router } from "express";
import {
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/messageController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", getMessages);

router.post("/", authMiddleware, createMessage);

router.put("/:id", authMiddleware, updateMessage);

router.delete("/:id", authMiddleware, deleteMessage);

export default router;
