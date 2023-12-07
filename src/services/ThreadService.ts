import { Repository } from "typeorm";
import {AppDataSource} from "../data-source";
import { Response, Request, response } from "express";
import { ThreadSchemaValidate, UpdateThreadValidate } from "../utils/ThreadSchemaValidation";
import { dataUri } from "../middlewares/uploadFile";
import { uploader } from "../config/cloudConfig";
import { Threads } from "../entities/Thread";

export default new (class ThreadService {
    private readonly ThreadRepository: Repository<Threads> = AppDataSource.getRepository(Threads);
  
    async find(req: Request, res: Response): Promise<Response> {
      try {
        const threads = await this.ThreadRepository.find({
          relations: ["created_by", "number_of_replies", "like.user_id"],
          select: {
            created_by: {
              full_name: true,
              username: true,
              photo_profile: true,
            },
          },
        });
  
        return res
        .status(200)
        .json({status:"success", data:{threads}})

      } catch (error) {
        return res
          .status(500)
          .json({ status: 500, message: "something when wrong on find thread", error });
      }
    }

    async findOne(req: Request, res: Response) : Promise<Response> {
      try {
          const id = parseInt(req.params.id, 10)
          const thread = await this.ThreadRepository.findOne({
              where: {
                  id: id
              },
              relations: ["created_by", "number_of_replies", "number_of_replies.user_id"],
          })
          return res.status(200).json(thread)
      } catch (error) {
          return res.status(500).json({Error: "Error While Getting Threads"})
      }
    }

    async create(req: Request, res: Response): Promise<Response> {
      try {
        const {content} = req.body;
        const created_by = res.locals.loginSession.user.id;

        console.log(created_by);

        console.log(req.file);

        //Image
        let image = ""

        if(req.file === undefined){
          image = "";
        }else{
          const file = dataUri(req).content;
  
          console.log(file);
    
          const cloud = await uploader.upload(file, {
            use_filename: true,
            folder: "threads",
          });
  
          if(!cloud || !cloud.secure_url){
            return res.status(404).json({ status: 404, message: "image not found" });
          }

          image = cloud.secure_url
        }
  
  
        
        const { error , value } = ThreadSchemaValidate.validate({ content, created_by });
        if (error) return res.status(404).json({ status: 404, error });

        console.log(value);

        const newThread = await this.ThreadRepository.save({
          content,
          created_by,
          image,
        });

        console.log(newThread);
        
        return res
        .status(200)
        .json({ status: 200, message: "success", data: newThread });
        
      } catch (error) {
        return res.status(500).json({
          mstatus: 500,
          message: "something when wrong on create thread",
        });
      }
    }

    async delete(req: Request, res: Response): Promise<Response> {
      try {
        const id: number = parseInt(req.params.id, 10);
  
        const findThread = await this.ThreadRepository.findOneBy({ id });
  
        if (!findThread) {
          return res.status(404).json({ status: 404, message: "id not found" });
        }
  
        await this.ThreadRepository.remove(findThread);
  
        return res.status(200).json({ status: 200, message: "success to delete" });
      } catch (error) {
        return res
          .status(500)
          .json({ status: 500, message: "something when wrong on delete thread service" });
      }
    }
  
    async update(req: Request, res: Response): Promise<Response> {
      try {
        const id: number = parseInt(req.params.id, 10);
        const body = req.body;
  
        const findThread = await this.ThreadRepository.findOneBy({ id });
        if (!findThread) {
          return res.status(404).json({ status: 404, message: "id not found" });
        }
  
        const { error } = UpdateThreadValidate.validate(body);
        if (error) {
          return res.status(404).json({ status: 404, error });
        }
  
        if (body.content !== "") {
          findThread.content = body.content;
        }
        if (body.image !== "") {
          findThread.image = body.image;
        }
  
        this.ThreadRepository.update(findThread, body);
        const update = await this.ThreadRepository.save(findThread);
  
        return res.status(200).json({ status: 200, message: "success to update", data: body });
      } catch (error) {
        return res
          .status(500)
          .json({ status: 500, message: "something when wrong on update thread" });
      }
    }
  })();
  