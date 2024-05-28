import { TCode, TMonth, TName, TSemesterNameAndCodeMapper } from "./01.academicSemester.interface"

export const TMonths: TMonth[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const TNameCons: TName[] = ['Autumn', 'Summer', 'Fall']
export const TCodeCons: TCode[] = ['01', '02', '03']

export const SemesterNameAndCodeMapper: TSemesterNameAndCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03'
}