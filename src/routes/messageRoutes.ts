import { Router } from "express";
import {
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/messageController";
import { canModify } from "../middleware/canModify";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get("/", verifyToken, getMessages);

router.post("/", verifyToken, createMessage);

router.put("/:id/:userId", verifyToken, canModify, updateMessage);

router.delete("/:id/:userId", verifyToken, canModify, deleteMessage);

export default router;
