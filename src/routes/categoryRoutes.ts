import { Router } from "express";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../controllers/categoryController";
import { canModify} from "../middleware/canModify";

const router = Router();
router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id/:userId", updateCategory, canModify);
router.delete("/:id/:userId", deleteCategory, canModify);
export default router;
