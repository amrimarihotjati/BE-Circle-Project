import { Router } from "express";
import ReplyController from "../controllers/ReplyController";
import authUser from "../middlewares/authUser";
import UploadImageMiddleware from "../middlewares/uploadFile";

const router = Router();

router.get("/replys",  authUser, ReplyController.find);
router.post("/reply/:id", authUser, UploadImageMiddleware.upload("upload"), ReplyController.create);
router.patch("/reply/:id", authUser, ReplyController.update);
router.delete("/reply/:id",  authUser, ReplyController.delete);

export default router;
