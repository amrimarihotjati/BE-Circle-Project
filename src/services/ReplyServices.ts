import { Repository } from "typeorm"
import { Reply } from "../entities/reply"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { createReplySchema } from "../utils/validator/Reply"
import { User } from "../entities/user"

export default new class ReplyServices {
    private readonly ReplyRepository: Repository<Reply> = AppDataSource.getRepository(Reply)

    async findAll (req: Request, res: Response) : Promise<Response>{
        try {
            const replys = await this.ReplyRepository.find({
                relations: ["user"],
                select: {
                    user:{
                        id:true,
                        full_name:true,
                        username:true,
                        email:true,
                        profile_picture:true
                    }
                }
            })
            return res
            .status(200)
            .json({status:"success", data:{replys}})
        } catch (error) {
            return res.status(500).json({Error: "Error While Getting Replys"})
        }
    }

    async findOne(req: Request, res: Response) : Promise<Response> {
        try {
            const id = parseInt(req.params.id, 10)
            const reply = await this.ReplyRepository.findOne({
                where: {
                    id:id
                }
            })
            return res.status(200).json(reply)
        } catch (error) {
            return res.status(500).json({Error: "Error While Getting Replys"})
        }
    }

    async create (req: Request, res: Response) : Promise<Response>{
        try {
            const data = req.body

            const {error, value} = createReplySchema.validate(data)

            if (error) {
                return res.status(400).json({ Error: "Validation Error", Details: error.details });
            }

            const reply = this.ReplyRepository.create({
                reply: value.reply,
                user: value.user
            })

            const createReply = await this.ReplyRepository.save(reply)

            return res.status(201).json(createReply)


        }catch (error) {
            return res.status(500).json({Error: "Error While Creating Replys"})
        }
    }
}