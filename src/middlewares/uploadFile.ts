import multer from "multer";
import * as path from "path";
import { Request } from "express";
import DataURIParser from "datauri/parser";



export default new (class UploadImageMiddleware{
    upload(fieldName: string){
        const storage = multer.memoryStorage();

        const uploadFile = multer({
            storage: storage,
        })

        return uploadFile.single(fieldName)
    }
})();

const dUri = new DataURIParser();
const dataUri = (req: Request) => {
  return dUri.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  );
};

export { dataUri };