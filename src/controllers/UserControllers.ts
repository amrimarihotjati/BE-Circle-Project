import { Request, Response } from "express";
import UserServices from "../services/UserServices";


class ThreadsControllers{
    
    findAll(req: Request, res: Response){
        UserServices.findAll(req, res)
    }

    create(req: Request, res: Response){
        UserServices.create(req, res)
    }

    update(req: Request, res: Response){
        UserServices.update(req, res)
    }

    delete(req: Request, res: Response){
        UserServices.delete(req, res)
    }

    findOne(req: Request, res: Response){
        UserServices.findOne(req, res)
    }

}

export default new ThreadsControllers();