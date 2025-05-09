import { parse } from "cookie";
import { NextFunction, Request, Response } from "express";
import { checkToken, checkTokenAvailble } from "../ult/check";
import { UserRepository } from "../repository/user";
const userRepository = new UserRepository()
interface CustomRequest extends Request {
    id?: number
}
export class MiddleWare {

    position: string;

    constructor(position: string) {
        this.position = position
    }

    async forward(req: CustomRequest, res: Response, next: NextFunction) {
        const cookies = req.headers.cookie;
        const token = cookies ? parse(cookies).token : undefined;
        const result = checkToken(token) ||
            token && process.env.SECRETTOKEN && await checkTokenAvailble(token, process.env.SECRETTOKEN)
        if (result && result.success) {
            req.id = result.id
            const users = await userRepository.getUser({ id: result.id })
            const position = users?.data[0].position
            if (position === this.position || position === "admin") {
                next()
            } else {
                res.json({
                    success: false,
                    msg: "you dont have authorization"
                })
            }
        } else {
            res.json({
                success: false,
                msg: "you dont have authorization"
            })
        }
    }

}