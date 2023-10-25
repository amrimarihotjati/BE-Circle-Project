import * as express from 'express'
import ThreadControllers from '../controllers/ThreadControllers'

const routerThread = express.Router()

routerThread.get("/threads", ThreadControllers.findAll)
routerThread.get("/threads/:id", ThreadControllers.findOne)
routerThread.delete("/threads/:id", ThreadControllers.delete)
routerThread.patch("/threads/:id", ThreadControllers.update)
routerThread.post("/thread", ThreadControllers.create)

export default routerThread