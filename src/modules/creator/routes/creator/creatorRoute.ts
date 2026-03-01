import { Router } from "express";
import { deleteCreatorProfile, updateCreatorProfile } from "../../controller/creatorController.js";
import authenticated from "../../../../shared/middlewares/authenticated.js";
import { isCreator } from "../../../../shared/middlewares/isCreator.js";

const router = Router();

router.use(authenticated, isCreator);

router.patch("/", updateCreatorProfile);

router.delete("/", deleteCreatorProfile);

export default router;
