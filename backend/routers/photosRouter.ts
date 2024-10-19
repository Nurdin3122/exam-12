import express, { Request, Response, NextFunction } from "express";
import Photo from "../models/Photos";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";

const photosRouter = express.Router();

photosRouter.get('/',async (req:Request,res:Response,next:NextFunction):Promise<void> => {
    try {
        const photos = await Photo.find();
        if(!photos) {
            res.status(404).send({ error: 'photos not found' });
            return
        }
        res.status(201).send(photos);
    } catch (error) {
        return next(error);
    }
});

photosRouter.post('/' ,auth,imagesUpload.single('image'),async (req:RequestWithUser,res:Response,next:NextFunction):Promise<void> => {
    try {
        const user = req.user;

        if (!user) {
            res.status(401).send({ error: 'User not authenticated' });
            return
        }

        const photo = new Photo({
            user: {
                _id: user._id,
                name: user.displayName,
            },
            name:req.body.name,
            image:req.file ? req.file.filename : null,
        })
        await photo.save();
        res.status(201).send(photo);

    } catch (error) {
        return next(error);
    }
});




export default photosRouter;