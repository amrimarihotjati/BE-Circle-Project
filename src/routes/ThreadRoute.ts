import { Router } from "express";
import ThreadController from "../controllers/ThreadController";


const router = Router();

router.get("/threads", ThreadController.find)
router.get("/threads/:id", ThreadController.findOne)
router.post("/threads", ThreadController.create)
router.delete("/threads/:id", ThreadController.delete)
router.patch("/threads/:id", ThreadController.update)

export default router