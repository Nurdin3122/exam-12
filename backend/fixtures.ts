import mongoose from "mongoose";
import crypto from "crypto";
import User from "./models/Users";
import config from "./config";
import Photo from "./models/Photos";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;
    try {
        await db.dropCollection('users');
        await db.dropCollection('photos');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    const [user1,user2] = await User.create({
        email: 'User',
        password: '0555',
        token: crypto.randomUUID(),
        displayName:"User",
        image:"logoForAnnonUser.jpg",
        role: "user",
    }, {
        email:"Admin",
        password: "0555",
        token: crypto.randomUUID(),
        displayName:"Admin",
        image:"logoForAnnonUser.jpg",
        role: "admin"
    });

    const [photo1,photo2,photo3,photo4] = await Photo.create([{
        name:"Evening Bishkek",
        image:'photo1.jpg',
        user:{
            _id:user1._id,
            name:user1.displayName,
        }
    },{
        name:"Mesmerizing sea",
        image:'photo2.jpg',
        user:{
            _id:user1._id,
            name:user1.displayName,
        }
    },{
        name:"Here",
        image:"photo3.jpg",
        user:{
            _id:user2._id,
            name:user2.displayName,
        }
    },{
        name:"for me it's person...",
        image:"photo4.jpg",
        user:{
            _id:user2._id,
            name:user2.displayName,
        }
    }]);
    await db.close();
};
run().catch(console.error);