import { Router } from "express";
import { deleteCreator, getAllCreators, getCreator, updateCreator } from "../../controller/creatorController.js";
import authenicated from "../../../../shared/middlewares/authenicated.js";
import { isAdmin } from "../../../../shared/middlewares/isAdmin.js";

const router = Router();

router.use(authenicated, isAdmin);

router.get("/", getAllCreators);

router.get("/:id", getCreator);

router.patch("/:id", updateCreator);

router.delete("/:id", deleteCreator);

export default router;
