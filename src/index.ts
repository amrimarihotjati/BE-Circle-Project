import { AppDataSource } from "./data-source"
import * as express from "express"
import routerThread from "./route/ThreadRoutes"
import routerUser from "./route/UserRoutes"
import routerReply from "./route/ReplyRoutes"



AppDataSource.initialize()

.then(async () => {
    const app = express()
    const port = 5000

    app.use(express.json())
    app.use("/api/v1", routerThread ) //akan menjadi http://localhost:5000/api/v1/hello
    app.use("/api/v1", routerUser )
    app.use("/api/v1", routerReply )

    app.listen(port, () => {
        console.log("Server Running on port :" + port)
    })

})
.catch
(error => console.log
    (error)
)
