import { Router } from "express";
import UserController from "../controllers/UserController";
import authUser from "../middlewares/authUser";

const router = Router();

router.get("/users",  UserController.find);
router.patch("/user", authUser, UserController.update);
router.delete("/user/:id", authUser, UserController.delete);

router.post("/logout", authUser, UserController.logout);

router.post("/auth/users", UserController.register);
router.post("/auth/login", UserController.login);
router.get("/auth/check", authUser, UserController.checkLogin)

router.post("/follow/", authUser, UserController.follow);

export default router;
