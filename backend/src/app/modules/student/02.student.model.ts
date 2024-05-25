import { Schema, model } from 'mongoose';
// import { TAddress, TGuardian, TStudent, StudentMethods, StudentModel, TUserName } from './001.student.interface';
import { StudentModel, TAddress, TGuardian, TStudent, TUserName } from './01.student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import configaration from '../../configaration';

const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, 'Firstname is required.'],
        maxlength: [20, 'Firstname can not have more than 20 characters.'],
        trim: true,
        validate: {
            validator: function (str: string) {
                const capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1);
                return capitalizedStr === str;
            },
            message: '{VALUE} is not in capitalized format.'
        }
    },
    middlename: {
        type: String
    },
    lastName: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) => {
                return validator.isAlpha(value);
            },
            message: '{VALUE} is not valid.'
        }
    }
})

const guardianSchema = new Schema<TGuardian>({
    fatherName: { type: String, required: true },
    fatherContactNo: { type: Number, required: true },
    fatherOccupation: { type: String, required: true },
    motherName: { type: String, required: true },
    motherContactNo: { type: Number, required: true },
    motherOccupation: { type: String, required: true },
})

const addressSchema = new Schema<TAddress>({
    house: { type: String, required: true },
    road: { type: String, required: true },
    village: { type: String, required: true },
    district: { type: String, required: true },
    division: { type: String, required: true },
    country: { type: String, required: true },
})


// main schema of the folder
const StudentSchema = new Schema<TStudent, StudentModel>({
    id: { type: Number, required: true, unique: true },
    password: { type: String, required: true, max: [20, 'bhai, kindly 20 character er beshi password diyen na.'] },
    name: {
        type: userNameSchema,
        required: [true, 'are bhai bhai bhai! Name field kidar hein?'] //createing custom error message with mongoose.
    },
    gender: {
        type: String,
        enum: {
            values: ['Male', 'Female'],
            message: "The gender field can only be one of the following: 'Male', 'Female' "
        },
        required: true
    }, // this concept is called enum.
    email: {
        type: String,
        unique: true,
        validate: {
            validator: (value: string) => {
                return validator.isEmail(value);
            },
            message: '{VALUE} is not valid Email Type.',
        }
    },
    contantNo: { type: Number, required: true },
    emergencyContactNo: { type: Number },
    bloodGroup: {
        type: String,
        enum: {
            values: ["A", "B", "AB", "O", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
            message: '{VALUE} is not valid. ',
        },
    },
    guardian: {
        type: guardianSchema,
        required: true
    },
    presentAddress: {
        type: addressSchema,
        required: true
    },
    permanentAddress: {
        type: addressSchema,
        required: true
    },
    localGuardian: {
        name: {
            type: userNameSchema,
            required: true
        },
        occupation: { type: String, required: true },
        presentAddress: {
            type: addressSchema,
            required: true
        },
        contantNo: { type: String, required: true }
    },
    isActive: { type: Boolean, required: true },
    isDeleted: { type: Boolean, default: false },
}, {
    toJSON: {
        virtuals: true
    }
})


// virtual
StudentSchema.virtual('fullname').get(function () {
    return `${this.name.firstName} ${this.name.middlename} ${this.name.lastName}`;
})


// Pre save middleware or hook //will work on create() or save()
StudentSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password,
        Number(configaration.bcrypt_salt_round));

    next();
})


// Post save middleware or hook
StudentSchema.post('save', function (document, next) {
    document.password = '',
        next();
})


// query middleware
StudentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } })
    next();
});


StudentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({
        $match: { isDeleted: { $ne: true } }
    })
    next();
})



// custom instant method
// StudentSchema.methods.isStudentExist = async function (id: number) {
//     const existUser = await Student.findOne({ id });
//     return existUser;
// }

// custom static  method

StudentSchema.statics.isStudentExist = async function (id: number) {
    const existingUser = await Student.findOne({ id });
    return existingUser;
}


// model
export const Student = model<TStudent, StudentModel>('Student', StudentSchema); 