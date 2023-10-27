import { Request, Response } from "express";
import ReplyService from "../services/ReplyService";

export default new (class RepliceController {
  create(req: Request, res: Response) {
    ReplyService.create(req, res);
  }
  find(req: Request, res: Response) {
    ReplyService.find(req, res);
  }
  update(req: Request, res: Response) {
    ReplyService.update(req, res);
  }
  delete(req: Request, res: Response) {
    ReplyService.delete(req, res);
  }
})();
