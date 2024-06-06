import { Schema } from "mongoose";
import { TAdmin, TAdminAddress, TAdminName } from "./01.admin.interfsce";
import validator from "validator";


const adminNameSchema = new Schema<TAdminName>({
    firstName: {
        type: String,
        required: [true, 'First name is required.'],
        maxlength: [20, 'Firstname can not have more than 20 characters.'],
        trim: true,
        validate: {
            validator: (value: string) => {
                const capitalizedStr = value.charAt(0).toUpperCase() + value.slice(1);
                return capitalizedStr === value;
            },
            message: '{VALUE} is not in capitalized format.'
        }
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required.'],
        validate: {
            validator: (value: string) => {
                return validator.isAlpha(value);
            },
            message: '{VALUE} is not valid.'
        }
    },
})

const adminAddressSchema = new Schema<TAdminAddress>({
    house: {
        type: String,
        require: [true, 'House Name is required.']
    },
    road: {
        type: String,
        require: [true, 'Road number is required.']
    },
    village: {
        type: String,
        require: [true, 'Village Name is required.']
    },
    district: {
        type: String,
        require: [true, 'District Name is required.']
    },
    division: {
        type: String,
        require: [true, 'Division Name is required.']
    },
    country: {
        type: String,
        require: [true, 'Country Name is required.']
    },

})

const AdminSchema = new Schema<TAdmin>(
    {
        name: adminNameSchema,
        id: {
            type: Number,
            required: [true, 'Id is Required'],
            unique: true
        },
        user: {
            type: Schema.Types.ObjectId,
            required: [true, 'User is required.'],
            unique: true,
            ref: "User"
        },
        gender: {
            type: String,
            enum: {
                values: ["Male", "Female"],
                message: "The gender field can only be one of the following: 'Male', 'Female' "
            },
            required: true
        },
        email: {
            type: String,
            unique: true,
            validate: {
                validator: (value: string) => {
                    return validator.isEmail(value);
                },
                message: '{VALUE} is not a valid email type.'
            },
            required: [true, 'Email is Required']
        },
        managementDepartment: {
            type: String,
            required: [true, 'Management Department Id is Required'],
        },
        contactnumber: {
            type: Number,
            required: [true, 'Contact Number is Required'],
        },
        emergencyContactnumber: {
            type: Number,
            required: [true, 'Emergency Contact Number is Required'],
        },
        presentAddress: {
            type: adminAddressSchema,
            required: true
        },
        permanentAddress: {
            type: adminAddressSchema,
            required: true
        },
        profileImage: {
            type: String,
            required: [true, 'Image URL is Required'],
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    })

