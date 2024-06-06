import { Types } from "mongoose";

export type TAdmin = {
    id: number;
    user: Types.ObjectId;
    name: TAdminName;
    gender: "Male" | "Female";
    email: string;
    managementDepartment: string;
    contactnumber: number;
    emergencyContactnumber: number;
    presentAddress: TAdminAddress;
    permanentAddress: TAdminAddress;
    profileImage: string;
    isDeleted: boolean;
}

export type TAdminName = {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export type TAdminAddress = {
    house: string;
    road: string;
    village: string;
    district: string;
    division: string;
    country: string
}