import { Router } from "express";
import FollowController from "../controllers/FollowController";

const router = Router();

router.get("/following", FollowController.find);
router.post("/follow", FollowController.create);
router.delete("/unfollow/:id", FollowController.delete);

export default router;
