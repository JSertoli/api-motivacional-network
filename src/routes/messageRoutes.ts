import { Router } from "express";
import {
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/messageController";
import { authMiddleware } from "../middleware/auth";
import { canModify } from "../middleware/canModify";

const router = Router();

router.get("/", getMessages);

router.post("/", authMiddleware, createMessage);

router.put("/:id/:userId", authMiddleware, canModify, updateMessage);

router.delete("/:id/:userId", authMiddleware, canModify, deleteMessage);

export default router;
