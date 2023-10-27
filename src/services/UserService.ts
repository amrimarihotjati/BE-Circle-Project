import { Repository } from "typeorm"
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { UserSchemaValidate } from "../utils/UserSchemaValidate";



export default new (class UserService {
    private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User);

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.UserRepository.find({

            }); 

            // console.log(findAll)

            return res
                .status(200)
                .json({
                    status: 200,message: "success", data: {users}
                })

        } catch (error) {
            return res.status(500).json({
                satatus: 500,
                message: "something when wrong on find all user ",
                error,
              });
        }
    }

    async register(req: Request, res: Response): Promise<Response> {
        try {
            const dataUser = req.body;
            const { error, value } = UserSchemaValidate.validate(dataUser);

            if (error) {
                return res.status(400).json({ Error: "Validation Error", Details: error.details });
            }

            const newUser = this.UserRepository.create({
                username: value.username,
                full_name: value.full_name,
                email: value.email,
                password: value.password
            })

            const createUser = await this.UserRepository.save(newUser);
            return res.status(201).json(createUser);

        } catch (error) {
            return res.status(500).json({ Error: `${error}` });
        }
    }
})