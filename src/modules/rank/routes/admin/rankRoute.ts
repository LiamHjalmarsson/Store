import { Router } from "express";
import authenticated from "../../../../shared/middlewares/authenticated.js";
import { isAdmin } from "../../../../shared/middlewares/isAdmin.js";
import { createRank, deleteRank, getAllRanks, getRank, updateRank } from "../../controllers/rankController.js";
import { createValidation } from "../../validations/createValidation.js";
import { updateValidation } from "../../validations/updateValidation.js";

const router = Router();

router.use(authenticated, isAdmin);

router.get("/", getAllRanks);
router.post("/", createValidation, createRank);
router.get("/:id", getRank);
router.patch("/:id", updateValidation, updateRank);
router.delete("/:id", deleteRank);

export default router;
