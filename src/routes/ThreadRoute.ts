import { Router } from "express";
import ThreadController from "../controllers/ThreadController";
import authUser from "../middlewares/authUser";
import UploadImageMiddleware from "../middlewares/uploadFile";


const router = Router();

router.get("/threads", ThreadController.find)
router.get("/threads/:id", ThreadController.findOne)
router.post("/threads", authUser, UploadImageMiddleware.upload("upload"), ThreadController.create)
router.delete("/threads/:id", authUser, ThreadController.delete)
router.patch("/threads/:id", authUser, ThreadController.update)

export default router