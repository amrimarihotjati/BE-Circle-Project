import { AppDataSource } from "./data-source";
import * as express from "express";
import * as cors from "cors";
import { ThreadRoute, UserRoute, ReplyRoute } from "./routes";




AppDataSource.initialize()
    .then(async () => {
        const app = express();
        
        //Port
        const PORT = 5000;
        //Cors Option
        const API_URL = "http://localhost:5173/";
        const option: cors.CorsOptions = {
            allowedHeaders: ["X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],

            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            preflightContinue: false,
        }

        app.use(cors(option));
        app.use(express.json());
        app.use("/api/v1", ThreadRoute);
        app.use("/api/v1", UserRoute);
        app.use("/api/v1", ReplyRoute);


        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        })

    })
    .catch((error) => console.log(error));