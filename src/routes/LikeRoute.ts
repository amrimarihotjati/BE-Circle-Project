import { Router } from "express";
import LikeController from "../controllers/LikeController";


const router = Router();

router.get("/replys", LikeController.find);
router.post("/reply", LikeController.create);
router.delete("/reply/:id", LikeController.delete);

export default router;
