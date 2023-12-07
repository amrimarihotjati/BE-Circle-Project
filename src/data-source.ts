import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "ep-young-frog-34115073.us-east-2.aws.neon.tech",
    port: 5432,
    username: "amrimarihotjati",
    password: "rFWDSRX23quG",
    database: "circledb",
    synchronize: true,
    logging: false,
    ssl: true,
    entities: [
        "src/entities/*ts"
    ],
    migrations: [
        "src/migrations/*ts"
    ],
    subscribers: [],
})
