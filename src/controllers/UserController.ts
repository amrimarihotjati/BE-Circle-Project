import { Request, Response } from "express";
import UserService from "../services/UserService";



export default new (class UserController {
    register(req: Request, res: Response){
        UserService.register(req, res);
    }

    find(req: Request, res: Response){
        UserService.find(req, res);
    }

    // update(req: Request, res: Response){
    //     ThreadService.update(req, res);
    // }

    // delete(req: Request, res: Response){
    //     ThreadService.delete(req, res);
    // }
})