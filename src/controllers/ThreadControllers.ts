import { Request, Response } from "express";
import ThreadServices from "../services/ThreadServices";

class ThreadsControllers{
    
    findAll(req: Request, res: Response){
        ThreadServices.findAll(req, res)
    }
    
    create(req: Request, res: Response){
        ThreadServices.create(req, res)
    }

    findOne(req: Request, res: Response){
        ThreadServices.findOne(req, res)
    }

    delete(req: Request, res: Response){
        ThreadServices.delete(req, res)
    }

    update(req: Request, res: Response){
        ThreadServices.update(req, res)
    }

}

export default new ThreadsControllers();