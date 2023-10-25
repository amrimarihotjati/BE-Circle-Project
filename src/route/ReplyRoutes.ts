import * as express from 'express'
import UserControllers from '../controllers/UserControllers'
import ReplyControllers from '../controllers/ReplyControllers'

const routerReply = express.Router()

routerReply.get("/replys", ReplyControllers.findAll)
routerReply.get("/reply/:id", ReplyControllers.findOne)
routerReply.post("/reply", ReplyControllers.create)

export default routerReply