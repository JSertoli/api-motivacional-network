import { Router } from "express";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../controllers/categoryController";
import { canModify} from "../middleware/canModify";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();
router.get("/", verifyToken, getCategories);
router.post("/", verifyToken, createCategory);
router.put("/:id/:userId", verifyToken, updateCategory, canModify);
router.delete("/:id/:userId", verifyToken, deleteCategory, canModify);
export default router;
