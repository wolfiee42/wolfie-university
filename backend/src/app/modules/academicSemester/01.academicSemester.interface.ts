
export type TMonth =
    "January" |
    "February" |
    "March" |
    "April" |
    "May" |
    "June" |
    "July" |
    "August" |
    "September" |
    "October" |
    "November" |
    "December";

export type TName = 'Autumn' | 'Summer' | 'Fall';

export type TCode = '01' | '02' | '03';

export type TAcademicSemester = {
    name: TName;
    year: string;
    code: TCode;
    startMonth: TMonth;
    endMonth: TMonth;
}

export type TSemesterNameAndCodeMapper = {
    [key: string]: string
}