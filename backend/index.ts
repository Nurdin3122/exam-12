import cors from 'cors';
import express from 'express';
import  mongoose from "mongoose";
import config from "./config";
import path from "path";
import usersRouter from "./routers/usersRouter";
import photosRouter from "./routers/photosRouter";


const app = express();
const port = 8030;


app.use(express.static(path.join(config.publicPath, 'images')));
app.use(cors());
app.use(express.json());
app.use('/users',usersRouter);
app.use('/photos',photosRouter);


const run = async () => {
    await mongoose.connect(config.db);
    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
    process.on('exit', () => {
        mongoose.disconnect();
    });
};
run().catch(console.error);