import { Router } from "express";
import FollowController from "../controllers/FollowController";
import authUser from "../middlewares/authUser";

const router = Router();

router.get("/following", authUser, FollowController.find);
router.post("/follow", authUser, FollowController.create);
router.delete("/unfollow/:id", authUser, FollowController.delete);

export default router;
