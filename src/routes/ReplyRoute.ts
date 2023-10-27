import { Router } from "express";
import ReplyController from "../controllers/ReplyController";

const router = Router();

router.get("/replys", ReplyController.find);
router.post("/reply", ReplyController.create);
router.patch("/reply/:id", ReplyController.update);
router.delete("/reply/:id", ReplyController.delete);

export default router;
