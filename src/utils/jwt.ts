import { Types } from "mongoose";
import { User } from "../models/user.model";
import jwt from 'jsonwebtoken';
import { SECRET } from "./env";

//supaya kita extends dari class user tetapi tidak menggunakan semua dari properti yang di isi jadi porperti yg di inputkan akan di lewati
export interface IUserToken extends Omit<
User,
| "password" 
| "activationCode" 
| "isActive" 
| "email" 
| "fullName"
| "profilePicture" 
| "username"
> {
    id?: Types.ObjectId;
}

export const generateToken = (user: IUserToken): string => {
    const token = jwt.sign(user, SECRET, {
        expiresIn: "1h",
    });
    return token;
};

export const getUserData = (token: string) => {
    const user = jwt.verify(token, SECRET) as IUserToken;
    return user;
};