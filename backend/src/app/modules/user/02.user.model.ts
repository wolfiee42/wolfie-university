import mongoose, { model } from "mongoose";
import { TUser } from "./01.user.interface";
import bcrypt from 'bcrypt';
import configaration from "../../configaration";





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


//  hash password
userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password,
        Number(configaration.bcrypt_salt_round));

    next();
})


// remove password so that it is invisible.
userSchema.post('save', function (document, next) {
    document.password = '',
        next();
})

export const userModel = model<TUser>('Users', userSchema)