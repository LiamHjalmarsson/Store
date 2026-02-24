import { Router } from "express";
import { deleteCreatorProfile, updateCreatorProfile } from "../../controller/creatorController.js";
import authenicated from "../../../../shared/middlewares/authenicated.js";
import { isCreator } from "../../../../shared/middlewares/isCreator.js";

const router = Router();

router.use(authenicated, isCreator);

router.patch("/", updateCreatorProfile);

router.delete("/", deleteCreatorProfile);

export default router;
