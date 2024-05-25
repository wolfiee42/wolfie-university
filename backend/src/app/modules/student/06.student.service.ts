import { TStudent } from "./01.student.interface";
import { Student } from "./02.student.model";




// get a single students information
const getSingleStudentFromDB = async (email: string) => {

    // without aggregate
    // const result = await Student.findOne({ email: email });

    // with aggregate
    const result = await Student.aggregate([
        { $match: { email: email } }
    ])
    return result;
}

// get a single students information
const deleteStudentFromDB = async (id: string) => {
    const result = await Student.updateOne({ id }, { isDeleted: true })
    return result;
}


// get all student information 
const getAllStudentsFromDB = async () => {
    const result = await Student.find();
    return result;
}



export const studentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB
}