import {Schema, model, Document} from "mongoose";

interface IUser {
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = model<IUser & Document>('users',userSchema);

export default User;