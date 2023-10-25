import { Repository } from "typeorm"
import { Thread } from "../entities/thread"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { createThreadSchema } from "../utils/validator/Thread"
import { User } from "../entities/user"

export default new class ThreadServices {
    private readonly ThreadRepository: Repository<Thread> = AppDataSource.getRepository(Thread)

    async findAll (req: Request, res: Response) : Promise<Response>{
        try {
            const threads = await this.ThreadRepository.find({
                relations: ["users"],
                select: {
                    users:{
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
            .json({status:"success", data:{threads}})
        } catch (error) {
            return res.status(500).json({Error: "Error While Getting Threads"})
        }
    }

    async findOne(req: Request, res: Response) : Promise<Response> {
        try {
            const id = parseInt(req.params.id, 10)
            const thread = await this.ThreadRepository.findOne({
                where: {
                    id:id
                }
            })
            return res.status(200).json(thread)
        } catch (error) {
            return res.status(500).json({Error: "Error While Getting Threads"})
        }
    }
    
    async update (req: Request, res: Response) : Promise<Response>{
        try {
            const id = parseInt(req.params.id, 10)
            const data = req.body

            const {error, value} = createThreadSchema.validate(data)
            if (error) {
                return res.status(400).json({ Error: "Validation Error", Details: error.details });
            }

            const thread = await this.ThreadRepository.findOne({
                where: {
                    id:id
                }
            })

            thread.content = value.content
            thread.image = value.image
            thread.users = value.user

            const updateThread = await this.ThreadRepository.save(thread)

            return res.status(200).json(updateThread)

        } catch (error) {
            return res.status(500).json({Error: "Error While Creating Threads"})
        }       
    }

    async create (req: Request, res: Response) : Promise<Response>{
        try {
            const data = req.body

            const {error, value} = createThreadSchema.validate(data)
            if (error) {
                return res.status(400).json({ Error: "Validation Error", Details: error.details });
            }

            console.log(value);

            const thread = this.ThreadRepository.create({
                content: value.content,
                image: value.image,
                users: value.users
            })

            const createThread = await this.ThreadRepository.save(thread)

            return res.status(201).json(createThread)

        } catch (error) {
            return res.status(500).json({Error: "Error While Creating Threads"})
        }
    }


    async delete (req: Request, res: Response) : Promise<Response>{
        try {
            const id = parseInt(req.params.id, 10)
            const thread = await this.ThreadRepository.findOne({
                where: {
                    id:id
                }
            })
            await this.ThreadRepository.remove(thread)
            return res.status(204).json()
        } catch (error) {
            return res.status(500).json({Error: "Error While Deleting Threads"})
        }
    }


}