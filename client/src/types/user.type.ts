interface IUserState {
    user: IUser | null;
    loading: boolean | null;
    error: boolean | null;
}

interface IUser {
    id: string;
    name: string,
    email: string,
    verified?: boolean,
    role?: string
    token?: string
}

interface IUserReg {
    name: string,
    email: string,
    password: string
}

interface IUserLog {
    email: string;
    password: string
}