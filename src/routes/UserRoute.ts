import { Router } from "express";
import UserController from "../controllers/UserController";
import authUser from "../middlewares/authUser";

const router = Router();

router.get("/users", UserController.find);
router.patch("/user/:id", authUser, UserController.update);
router.delete("/user/:id", authUser, UserController.delete);

router.post("/logout", authUser, UserController.logout);
router.post("/users", UserController.register);
router.post("/login", UserController.login);

export default router;
