import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

// export interface User extends Request {
//   user: any;
// }

export {};
declare global {
  namespace Express {
    interface Response {
      user?: any;
    }
  }
}

const authUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.headers.authorization

    if(!Authorization || !Authorization.startsWith("Bearer ")) {
      return res.status(401).json({ Error: "Unauthorized" })
    }

    const token = Authorization.split(" ")[1]

    try {
      const loginSession = jwt.verify(token, "pinjam_seratus")
      res.locals.loginSession = loginSession
      next()
    } catch (err) {
      return res.status(401).json({ Error: "Unauthorized" })
    }
  } catch (err) {
    return res.status(500).json({ Error: "Error while authenticating" })
  }
};

export default authUser;
