import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Replies } from "../entities/Replies";
import { Threads } from "../entities/Thread";
import { Repository } from "typeorm";
import { ReplySchemaValidation, ReplyUpdateValidation } from "../utils/ReplySchemaValidation";
import { dataUri } from "../middlewares/uploadFile";
import { uploader } from "../config/cloudConfig";


type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type Therads = {
  id?: number;
  content?: string;
  image?: string;
  created_at?: Date;
  updated_at?: Date;
  user_id?: number;
};

export default new (class ReplyService {
    private readonly ReplyRepository: Repository<Replies> = AppDataSource.getRepository(Replies);
    private readonly ThreadRepository: Repository<Threads> =
    AppDataSource.getRepository(Threads);

    async find (req: Request, res: Response): Promise<Response>{
        try {
            const findAll = await this.ReplyRepository.find({
                relations:{
                  thread_id: true,
                  user_id: true
                },
                select: {
                  user_id: {
                    id: true,
                    full_name: true,
                    username: true,
                    photo_profile: true,
                  },
                  thread_id: {
                    id: true,
                    image: true,
                    content: true
                  }
                }
            });

            return res.status(200).json({ status: 200, message: "success", data: findAll });
        } catch (error) {
            return res.status(500).json({ status: 500, message: "something when wrong on find replice" });
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
      try {
        const { content } = req.body;
        const user_id = res.locals.loginSession.user.id;
        const thread_id = parseInt(req.params.id);
        
        console.log(user_id);
        console.log(thread_id); // Mengecek apakah thread_id sudah benar

        const findThread: DeepPartial<Therads> =
        await this.ThreadRepository.findOne({
          where: { id: thread_id },
        });
        
        // Image
        let image = "";
        
        if (req.file === undefined) {
          image = "";
        } else {
          const file = dataUri(req).content;
        
          console.log(file);
        
          const cloud = await uploader.upload(file, {
            use_filename: true,
            folder: "threads",
          });
        
          if (!cloud || !cloud.secure_url) {
            return res.status(404).json({ status: 404, message: "image not found" });
          }
        
          image = cloud.secure_url;
        }
        
        const newReply = await this.ReplyRepository.save({
          content,
          user_id,
          image,
          thread_id:findThread,
        });
        
        return res.status(200).json({ status: 200, message: "success", data: newReply });
      } catch (error) {
        return res.status(500).json({ status: 500, message: "something went wrong on create Reply" });
      }
    }
    
    
    
  

    
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;
      const id: number = parseInt(req.params.id, 10);

      const findReplice = await this.ReplyRepository.findOneBy({ id });
      if (!findReplice) return res.status(404).json({ status: 404, message: "id not found" });

      const { error } = ReplyUpdateValidation.validate(body);

      if (error) return res.status(404).json({ status: 404, error });

      if (body.content !== "") {
        findReplice.content = body.content;
      }
      if (body.content !== "") {
        findReplice.image = body.image;
      }
      this.ReplyRepository.update(findReplice, body);
      const update = await this.ReplyRepository.save(findReplice);

      return res.status(200).json({ status: 200, message: "success to update", data: update });
    } catch (error) {
      return res.status(500).json({ status: 500, message: "something when wrong on replice" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = parseInt(req.params.id, 10);

      const findReplice = await this.ReplyRepository.findOneBy({ id });

      if (!findReplice) return res.status(404).json({ status: 404, message: "id not found" });

      this.ReplyRepository.remove(findReplice);
      return res.status(200).json({ status: 200, message: "success to delete replice" });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "something when wrong on delete replice" });
    }
  }

})