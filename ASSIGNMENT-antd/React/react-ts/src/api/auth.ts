import { IUser } from './../types/auth';
import { instance } from "./instance"

export const signin = (user: IUser) => {
    return instance.post("/signin", user);
}

export const signup = (user: IUser) => {
    return instance.post("/signup", user);
}
