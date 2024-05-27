import { studentModel } from "./02.student.model";




// get a single students information
const getSingleStudentFromDB = async (email: string) => {

    // without aggregate
    // const result = await studentModel.findOne({ email: email });

    // with aggregate
    const result = await studentModel.aggregate([
        { $match: { email: email } }
    ])
    return result;
}

// get a single students information
const deleteStudentFromDB = async (id: string) => {
    const result = await studentModel.updateOne({ id }, { isDeleted: true })
    return result;
}


// get all student information 
const getAllStudentsFromDB = async () => {
    const result = await studentModel.find();
    return result;
}



export const studentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB
}