import { Router } from "express";
import { deleteCreator, getAllCreators, getCreator, updateCreator } from "../../controller/creatorController.js";
import authenicated from "../../../../middlewares/authenicated.js";
import { isAdmin } from "../../../../middlewares/isAdmin.js";

const router = Router();

router.use(authenicated, isAdmin);

router.get("/", getAllCreators);

router.get("/:id", getCreator);

router.patch("/:id", updateCreator);

router.delete("/:id", deleteCreator);

export default router;
