export type TUser = {
    id: string;
    password: string;
    needPasswordChange: boolean;
    role: 'admin' | 'student' | 'faculty';
    isDeleted: boolean;
    status: 'in-progress' | 'blocked';
}

export type NewUser = {
    password: string;
    role: string;
    id: string
}