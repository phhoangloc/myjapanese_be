import { Response } from "express"
import { serialize } from "cookie"

export const saveCookie = (token: string, res: Response) => {
    res.setHeader('Set-Cookie', serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        path: '/',
        sameSite: 'none',
    }));
    return ({
        success: true,
        msg: "login success"
    })

}