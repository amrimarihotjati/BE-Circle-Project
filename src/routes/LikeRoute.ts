import { Router } from "express";
import LikeController from "../controllers/LikeController";
import authUser from "../middlewares/authUser";


const router = Router();

router.get("/likes", authUser, LikeController.find);
router.post("/like", authUser, LikeController.create);
router.delete("/like", authUser, LikeController.delete);

export default router;
