import mongoose, {Schema, Types} from "mongoose";
import User from "./Users";

const PhotosSchema = new Schema({
    user: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            validate: {
                validator: async (value: Types.ObjectId) => {
                    const userExists = await User.findById(value);
                    return Boolean(userExists);
                },
                message: 'user does not exist!',
            },
        },
        name: {
            type: String,
            required: true,
        },
    },
    name: {
        type:String,
        required:true,
    },
    image: {
        type: String,
        required:true,
    },
});

const Photo = mongoose.model('Photo',PhotosSchema);
export default Photo;