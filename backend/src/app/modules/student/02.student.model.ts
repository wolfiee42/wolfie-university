import { Schema, model } from 'mongoose';
import { StudentModel, TAddress, TGuardian, TStudent, TUserName } from './01.student.interface';
import validator from 'validator';

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
const StudentSchema = new Schema<TStudent, StudentModel>(
    {
        id: { type: Number, required: true, unique: true },
        name: {
            type: userNameSchema,
            required: [true, 'are bhai bhai bhai! Name field kidar hein?'] //createing custom error message with mongoose.
        },
        user: {
            type: Schema.Types.ObjectId,
            required: [true, 'User is required.'],
            unique: true,
            ref: 'User'
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
        academicSemester: {
            type: Schema.Types.ObjectId,
            ref: 'Academic Semesters',
            required: true
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
        isDeleted: {
            type: Boolean,
            default: false
        },
        academicDepartment: {
            type: Schema.Types.ObjectId,
            ref: 'Academic Department',
            required: true
        },
    }, {
    toJSON: {
        virtuals: true
    }
})




// model
export const studentModel = model<TStudent, StudentModel>('Students', StudentSchema); 