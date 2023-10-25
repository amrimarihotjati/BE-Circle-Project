import { Repository } from "typeorm"
import { User } from "../entities/user"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { createUserSchema } from "../utils/validator/User"


export default new class UserService{
    private readonly UserRepostory: Repository<User> = AppDataSource.getRepository(User)

    async findAll(req: Request, res: Response): Promise<Response>{
        try {
            const users = await this.UserRepostory.find({
                // relations: ["threads"],
                // select: {
                //     threads:{
                //         id:true,
                //         content:true,
                //         image:true,
                //         posted_at:true
                //     }
                // }
            })
            return res
            .status(200)
            .json({status:"success", data:{users}})
        } catch (error) {
            return res.status(500).json({Error: "Error While Getting Users"})
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const dataUser = req.body;
            const { error, value } = createUserSchema.validate(dataUser);

            if (error) {
                return res.status(400).json({ Error: "Validation Error", Details: error.details });
            }

            console.log(value)

            const newUser = this.UserRepostory.create({
                username: value.username,
                full_name: value.full_name,
                email: value.email,
                password: value.password,
                profile_picture: value.profile_picture,
                profile_description: value.profile_description
            })

            const createUser = await this.UserRepostory.save(newUser);
            return res.status(201).json(createUser);
        } catch (error) {
            return res.status(500).json({ Error: "Error While Creating User" });
        }
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await this.UserRepostory.findOne({
                where: {
                    id:id
                }
            })
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ Error: "Error While Getting User" });
            
        }
    }

    async update(req: Request, res: Response): Promise<Response>{
        try {
            const id = parseInt(req.params.id, 10)
            const data = req.body

            const {error, value} = createUserSchema.validate(data)
            if (error) {
                return res.status(400).json({ Error: "Validation Error", Details: error.details });
            }

            const user = await this.UserRepostory.findOne({
                where: {
                    id:id
                }
            })

            user.username = value.username
            user.full_name = value.full_name
            user.email = value.email
            user.password = value.password
            user.profile_picture = value.profile_picture
            user.profile_description = value.profile_description

            const updateUser = await this.UserRepostory.save(user)

            return res.status(200).json(updateUser)

        }catch (error) {
            return res.status(500).json({ Error: "Error While Creating User" });
        }
    }

    async delete(req: Request, res: Response): Promise<Response>{
        try {
            const id = parseInt(req.params.id, 10)
            const user = await this.UserRepostory.findOne({
                where: {
                    id:id
                }
            })
            await this.UserRepostory.remove(user)
            return res.status(204).json()
        }catch (error) {
            return res.status(500).json({ Error: "Error While Creating User" });
        }
    }

}