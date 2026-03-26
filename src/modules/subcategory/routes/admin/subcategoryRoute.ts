import { Router } from "express";
import { isAdmin } from "../../../../shared/middlewares/isAdmin.js";
import authenticated from "../../../../shared/middlewares/authenticated.js";
import { createSubcategory, deleteSubcategory, updateSubcategory } from "../../controllers/subcategoryController.js";
import { updateValidation } from "../../validations/updateValidation.js";
import { createValidation } from "../../validations/createValidation.js";

const router = Router();

router.use(authenticated, isAdmin);

router.post("/", createValidation, createSubcategory);

router.patch("/:id", updateValidation, updateSubcategory);

router.delete("/:id", deleteSubcategory);

export default router;
