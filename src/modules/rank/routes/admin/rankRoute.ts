import { Router } from "express";
import authenticated from "../../../../shared/middlewares/authenticated.js";
import { isAdmin } from "../../../../shared/middlewares/isAdmin.js";
import { createRankController, deleteRankController, updateRankController } from "../../controllers/rankController.js";
import { createValidation } from "../../validations/createValidation.js";
import { updateValidation } from "../../validations/updateValidation.js";

const router = Router();

router.use(authenticated, isAdmin);

router.post("/", createValidation, createRankController);

router.patch("/:id", updateValidation, updateRankController);

router.delete("/:id", deleteRankController);

export default router;
