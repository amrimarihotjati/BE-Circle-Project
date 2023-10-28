import { Router } from "express";
import ThreadController from "../controllers/ThreadController";
import authUser from "../middlewares/authUser";


const router = Router();

router.get("/threads", authUser, ThreadController.find)
router.get("/threads/:id", authUser, ThreadController.findOne)
router.post("/threads", ThreadController.create)
router.delete("/threads/:id", ThreadController.delete)
router.patch("/threads/:id", ThreadController.update)

export default router