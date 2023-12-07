import { Repository } from "typeorm"
import { User } from "../entities/user";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { UserSchemaValidate, UserSchemaUpdate, UserSchemaLogin } from "../utils/UserSchemaValidate";
import { hashPassword } from "../utils/user_bcript";
import { checkPassword } from "../utils/user_bcript";
import TokenConfig from "../utils/auth";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"


type TypeUserRegister = {
    username: string;
    full_name: string;
    photo_profile?: string;
    email: string;
    password: string;
    bio: string;
};
  
type TypeUserLogin = {
    email: string;
    password: string;
};

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
            const data: TypeUserRegister = req.body;
            const { bio, email, full_name, password, username } = data;
            const { error } = UserSchemaValidate.validate({
              full_name,
              email,
              password,
              username,
            });

            if(error) return res.status(404).json({ Error: `${error}` });

            const findUser = await this.UserRepository.count({
                where: { email: data.email}
            })

            if (findUser > 0)
            return res
              .status(404)
              .json({ status: 404, message: "email alredy exits" });
            
            const { passwordHash } = hashPassword(data.password, 10);

            const maxAge = 2 * 60 * 60;
            const token = TokenConfig.getToken(data.email, maxAge)

            const createUser = this.UserRepository.create({
                full_name: data.full_name,
                username: data.username,
                photo_profile: data.photo_profile,
                email: data.email,
                password: passwordHash,
                bio: data.bio,
            })

            await this.UserRepository.save(createUser);
            return res
            .status(200)
            .json({ status: 200, message: "success", data: createUser, token });

        } catch (error) {
            return res.status(500).json({ Error: `${error}` });
        }
    }

    
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const body: TypeUserLogin = req.body;

      const { error } = UserSchemaLogin.validate(body);
      if (error) {
        return res.status(404).json({ status: 404, error });
      }
      

      const isCheckUser = await this.UserRepository.findOne({
        where: {
          email: body.email
        },
        select: ['id', 'full_name', 'username', 'email', 'password']
      })

      if(!isCheckUser) return res.status(404).json({ status: 404, message: "email not found" })

      const isCheckPassword = await bcrypt.compare(body.password, isCheckUser.password)


      if (!isCheckPassword) return res.status(400).json({ Error: "Incorrect password" })

      const user = this.UserRepository.create({
        id: isCheckUser.id,
        full_name: isCheckUser.full_name,
        email: isCheckUser.email,
        username: isCheckUser.username,
        photo_profile: isCheckUser.photo_profile
      })

      console.log(user)

      const token = await jwt.sign({ user }, "pinjam_seratus", { expiresIn: "2h" })

      return res.status(200).json({
        user,
        token
      })

    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "something when wrong on login user" });
    }
  }

  async checkLogin(req: Request, res: Response): Promise<Response> {
    try {
      const logginSession = res.locals.loginSession
      
      const user = await this.UserRepository.findOne({
        where: {
          id: logginSession.user.id
        }
      })

      // console.log('login',user)

      
      return res.status(200).json({
        user,
        message: "You are logged in"
      })

    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "something when wrong on check login user",
      })
    }
  }

  async logout(req: Request, res: Response): Promise<Response> {
    try {
      res.cookie("jwt", "logout", {
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 1000),
      });

      return res.status(200).json({ status: 200, message: "succes log out" });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "something when wrong on logout user" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const idUser = res.locals.loginSession.user.id;

      const findOneUser = await this.UserRepository.findOneBy({ id: idUser });
      if (!findOneUser) {
        return res.status(404).json({ status: 404, message: "id not found" });
      }
      const body: TypeUserRegister = req.body;

      const { error } = UserSchemaUpdate.validate(body);
      if (error) return res.status(404).json({ status: 404, error });

      if (body.full_name !== "") {
        findOneUser.full_name = body.full_name;
      }
      if (body.username !== "") {
        findOneUser.username = body.username;
      }
      if (body.photo_profile !== "") {
        findOneUser.photo_profile = body.photo_profile;
      }
      if (body.email !== "") {
        findOneUser.email = body.email;
      }
      if (body.password !== "") {
        findOneUser.password = body.password;
      }
      if (body.bio !== "") {
        findOneUser.bio = body.bio;
      }

      this.UserRepository.update(findOneUser, body);

      const new_user = await this.UserRepository.save(findOneUser);
      return res
        .status(200)
        .json({ status: 200, message: "success", data: new_user });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "something when wrong on update user" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = parseInt(req.params.id);

      const findUser = await this.UserRepository.findOneBy({ id });

      const deleteuser = await this.UserRepository.remove(findUser);
      return res.status(200).json({
        status: 200,
        message: "success to delete data",
        data: deleteuser,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "something when wrong on delete user",
        error,
      });
    }
  }
})