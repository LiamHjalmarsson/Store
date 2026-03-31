import { Router } from "express";
import authenticated from "../../../../shared/middlewares/authenticated.js";
import { isAdmin } from "../../../../shared/middlewares/isAdmin.js";
import { deleteCreatorController, updateCreatorController } from "../../controllers/creatorController.js";
import { adminUpdateValidation } from "../../validations/adminUpdateValidation.js";

const router = Router();

router.use(authenticated, isAdmin);

router.patch("/:id", adminUpdateValidation, updateCreatorController);

router.delete("/:id", deleteCreatorController);

export default router;
