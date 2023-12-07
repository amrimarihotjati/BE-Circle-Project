import { Repository } from "typeorm";
import { Likes } from "../entities/Likes";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { LikeSchemaValidation } from "../utils/LikeSchemaValidation";

export default new (class LikeService {
  private readonly LikesRepository: Repository<Likes> = AppDataSource.getRepository(Likes);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const findLikes = await this.LikesRepository.find({
        relations: {
          user_id: true,
          thread_id: true,
        },
      });

      return res.status(200).json({ status: 200, message: "success", data: findLikes });
    } catch (error) {
      return res.status(500).json({ status: 500, message: "something when wrong on find likes" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const {thread_id} = req.body
      const user_id =  res.locals.loginSession.user.id

      const checkLike : Likes | null = await this.LikesRepository.findOne({
        where: {
          user_id: {
            id : user_id
          },
          thread_id: {
            id : thread_id
          }
        }
      })

      // if (checkLike > 0){
      //   throw new Error("You already like this thread!")
      // }

      if (checkLike) {
        await this.LikesRepository.remove(checkLike)
        return res.status(200).json({message: 'Like remove'});
      }

      const like = this.LikesRepository.create({
        user_id: user_id,
        thread_id: thread_id
      })

      console.log(like)

      const createLikes = await this.LikesRepository.save(like)

      return res.status(200).json({
        message: "You liked this thread!",
        createLikes
      })

    } catch (error) {
      return res.status(500).json({ status: 500, message: "something when wrong on create Like" });
    }
  }

async delete(req: Request, res: Response): Promise<Response> {
  try {
    const { thread_id } = req.body;
    const user_id = res.locals.loginSession.user.id;

    const like = await this.LikesRepository.findOne({
      where: {
        user_id: {
          id: user_id,
        },
        thread_id: {
          id: thread_id,
        },
      },
    });

    console.log(like)

    if (!like) {
      throw new Error("You didn't like this thread!");
    }

    console.log("Like to delete:", like);

    await this.LikesRepository.delete({
      id: like.id,
    });

    console.log("Like deleted successfully.");

    return res.status(200).json({
      message: "You unliked this thread!",
      like: like,
    });
  } catch (error) {
    console.error("Error deleting like:", error);
    return res.status(500).json({ status: 500, message: "Something went wrong on unlike action." });
  }
}})
