// import { Request, Response } from "express";
// import { ThreadSchemaValidate } from "../utils/ThreadSchemaValidation";
// import { MessageQueue } from "./rabbitmq";


// type QueuePlayload = {
//     content: String,
//     image: String,
//     user: Number
// }

// export default new class ThreadQueue {
//     async create (req: Request, res: Response){
//         try {
//             const queueName: string = process.env.THREAD
//             const user: any = res.locals.loginSession

//             const data = {
//                 content: req.body.content,
//                 image: res.locals.filename
//             }

//             const { error, value } = ThreadSchemaValidate.validate(data)
//             if(error) return res.status(400).json({error})

//             const playload: QueuePlayload = {
//                 content: value.content,
//                 image: value.image,
//                 user: loginSession.user.id
//             }

//             const errorQueue = await MessageQueue.MessageSend(process.env.THREAD, playload)
//             if(errorQueue) return res.status(500).json({message: "Error"})

//             return res.status(200).json({message: "success", playload})

//         } catch (error) {
//             return error
//         }
//     }
// }