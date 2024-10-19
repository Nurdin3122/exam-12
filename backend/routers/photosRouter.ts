import express, { Request, Response, NextFunction } from "express";
import Photo from "../models/Photos";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import User from "../models/Users";

const photosRouter = express.Router();

photosRouter.get('/',async (req:Request,res:Response,next:NextFunction):Promise<void> => {
    try {
        const { user } = req.query;
        const query: Record<string, any> = {};

        if(user) {
            const trueUser= await User.findById(user);
            if(!trueUser) {
                 res.status(400).send("there is not such id artist");
                return
            }
            query['user._id'] = user;
        }

        const photos = await Photo.find(query).populate({path: 'user._id', select: '_id name'});

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

photosRouter.delete('/:id',auth,async (req:RequestWithUser,res:Response,next:NextFunction):Promise<void> => {
    try {
        const id = req.params.id;
        await Photo.deleteOne({ _id: id });
        res.status(200).send({ message: 'Photo deleted successfully' });
        return;

    } catch (error){
        return next(error);
    }

});




export default photosRouter;