import express, { Request, Response, NextFunction } from "express";
import {randomUUID} from "crypto";
import {Error} from "mongoose";
import User from "../models/Users";
import {imagesUpload} from "../multer";
import bcrypt from "bcrypt";
import config from "../config";
import {OAuth2Client} from "google-auth-library";

const usersRouter = express.Router();
const googleClientId = new OAuth2Client(config.google.clientId);

usersRouter.post('/', imagesUpload.single('image'), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.displayName,
            image: req.file ? req.file.filename : null,
            token: randomUUID(),
        });

        await user.save();
        res.status(201).send(user);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error.message);
        } else {
            next(error);
        }
    }
});


usersRouter.post('/sessions', async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            res.status(400).send({error: 'Username not found'});
            return
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            res.status(400).send({error: 'Password is wrong'});
            return
        }
        user.token = randomUUID();
        await user.save()
        res.send(user);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error.message);
        } else {
            next(error);
        }
    }
});

usersRouter.post("/google",async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
        const ticket = await googleClientId.verifyIdToken({
            idToken: req.body.credential,
            audience:config.google.clientId,
        });

        const payload = ticket.getPayload();
        if(!payload) {
             res.status(400).send({error:"Google Login Error"});
            return
        }

        const email = payload.email;
        const id = payload.sub;
        const displayName = payload.name;

        if(!email) {
             res.status(400).send({error:"No email"})
            return
        }

        let user = await User.findOne({email:email}).exec();
        if(!user) {
            const newPassword = crypto.randomUUID();
            user = new User({
                email:email,
                password:newPassword,
                googleId:id,
                token:randomUUID(),
                displayName:displayName,
            });
        }
        await user.save();
         res.send(user)

    } catch (error) {
        return next(error)
    }
});


usersRouter.delete('/sessions', async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    try {
        const header = req.get('Authorization');
        if (!header || !header.startsWith('Bearer ')) {
            res.status(401).send({error: 'Token not provided!'});
            return
        }
        const token = header.split(' ')[1];
        const success = {message: 'Success'};
        if (!token)  {
            res.send(success)
            return
        }
        const user = await User.findOne({token});
        if (!user){
            res.send(success);
            return
        }

        user.token = "";
        user.save();

        res.send(success);
    } catch (e) {
        return next(e)
    }
});



export default usersRouter