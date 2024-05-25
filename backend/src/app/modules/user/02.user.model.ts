import mongoose, { model } from "mongoose";
import { TUser } from "./01.user.interface";

const { Schema } = mongoose;

const userSchema = new Schema<TUser>({
    id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    needPasswordChange: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'faculty'],
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
    }
},
    {
        timestamps: true
    }
)

export const userModel = model<TUser>('Users', userSchema)