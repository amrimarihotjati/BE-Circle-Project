import { Request, Response } from "express";
import ReplyServices from "../services/ReplyServices";


class ReplyControllers{

    findAll(req: Request, res: Response){
        ReplyServices.findAll(req, res)
    }

    create(req: Request, res: Response){
        ReplyServices.create(req, res)
    }

    findOne(req: Request, res: Response){
        ReplyServices.findOne(req, res)
    }

}

export default new ReplyControllers();