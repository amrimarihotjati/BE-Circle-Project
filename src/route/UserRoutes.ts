import * as express from 'express'
import UserControllers from '../controllers/UserControllers'

const routerUser = express.Router()

routerUser.get("/users", UserControllers.findAll)
routerUser.post("/user", UserControllers.create)
routerUser.patch("/user/:id", UserControllers.update)
routerUser.delete("/user/:id", UserControllers.delete)
routerUser.get("/user/:id", UserControllers.findOne)

export default routerUser