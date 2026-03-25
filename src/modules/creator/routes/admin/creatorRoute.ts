import { Router } from "express";
import { deleteCreator, getAllCreators, getCreator, updateCreator } from "../../controllers/creatorController.js";
import authenticated from "../../../../shared/middlewares/authenticated.js";
import { isAdmin } from "../../../../shared/middlewares/isAdmin.js";
import { adminUpdateCreatorValidation } from "../../validations/adminUpdateValidation.js";

const router = Router();

router.use(authenticated, isAdmin);

router.get("/", getAllCreators);

router.get("/:id", getCreator);

router.patch("/:id", adminUpdateCreatorValidation, updateCreator);

router.delete("/:id", deleteCreator);

export default router;
