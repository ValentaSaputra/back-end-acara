import { NextFunction, Request, Response } from "express";
import { getUserData, IUserToken } from "../utils/jwt";

export interface IReqUser extends Request {
    user?: IUserToken;

}

export default (req: Request, res: Response, next: NextFunction) => {
    const authorization =  req.headers?.authorization;

    if(!authorization) {

        return res.status(403).json({
            message: "unauthorized",
            data: null,
        });
    }

    const[prefix, token] = authorization.split(" ");

    // yang di cek negasinya / kebalikanya dari prefix === "Bearer" && token
    if(!(prefix === "Bearer" && token)) {
        return res.status(403).json({
            message: "unauthorized",
            data: null,
        });
    }

    const user = getUserData(token);

    if(!user) {
        return res.status(403).json({
            message: "unauthorized",
            data: null,
        });
    }

    //jika sudah lolos bisa casting dari argument req
    (req as IReqUser).user = user;

    //akan lanjut ke controller yg di definisikan di routingnya
    next();
};