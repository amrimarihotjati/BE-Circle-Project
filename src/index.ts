import { AppDataSource } from "./data-source";
import  express from "express";
import  cors from "cors";
import { ThreadRoute, UserRoute, ReplyRoute, LikeRoute } from "./routes";
import { cloudinaryConfig } from "./config/cloudConfig";
import cookieParser from "cookie-parser";




AppDataSource.initialize()
    .then(async () => {
        const app = express();
        
        //Port
        const PORT = 5000;
        //Cors Option
        const API_URL = "http://localhost:5173/";
        // const option: cors.CorsOptions = {
        //     allowedHeaders: ["X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],

        //     credentials: true,
        //     methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        //     preflightContinue: false,
        // }

        // app.use(cors(option));
        app.use(cors());
        app.use("*", cloudinaryConfig);
        
        app.use(express.json());
        app.use(cookieParser())
        app.use("/api/v1", ThreadRoute);
        app.use("/api/v1", UserRoute);
        app.use("/api/v1", ReplyRoute);
        app.use("/api/v1", LikeRoute);



        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        })

    })
    .catch((error) => console.log(error));