import { Request, Response } from "express";
import FollowService from "../services/FollowService";

export default new (class FollowingController {
  create(req: Request, res: Response) {
    FollowService.create(req, res);
  }
  delete(req: Request, res: Response) {
    FollowService.delete(req, res);
  }
  find(req: Request, res: Response) {
    FollowService.find(req, res);
  }
})();
