import mongoose from "mongoose";
import crypto from "crypto";
import User from "./models/Users";
import config from "./config";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;
    try {
        await db.dropCollection('users');
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
    await db.close();
};
run().catch(console.error);