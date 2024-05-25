import { Model } from "mongoose";

// Main interface of the file.
export type TStudent = {
    id: number;
    password: string,
    name: TUserName;
    gender: 'Male' | 'Female';
    email?: string;
    contantNo: number;
    emergencyContactNo?: number;
    bloodGroup?: "A" | "B" | "AB" | "O" | "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
    guardian: TGuardian;
    presentAddress: TAddress;
    permanentAddress: TAddress;
    localGuardian: TLocalGuardian;
    isActive: boolean;
    isDeleted?: boolean;
}



export type TGuardian = {
    fatherName: string;
    fatherContactNo: number;
    fatherOccupation: string;
    motherName: string;
    motherContactNo: number;
    motherOccupation: string;
}

export type TAddress = {
    house: string;
    road: string;
    village: string;
    district: string;
    division: string;
    country: string
}

export type TUserName = {
    firstName: string;
    middlename?: string;
    lastName: string;
};


export type TLocalGuardian = {
    name: TUserName;
    occupation: string;
    presentAddress: TAddress;
    contantNo: string;
}




// for creating instance

// method

// export type StudentMethods = {
//     isStudentExist(id: number): Promise<TStudent | null>
// }

// model
// export type StudentModel = Model<TStudent, Record<string, never>, StudentMethods>;


// for creating static
export interface StudentModel extends Model<TUserName> {
    isStudentExist(id: number): Promise<TStudent | null>
}