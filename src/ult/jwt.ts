import { sign } from "jsonwebtoken";

export const generateToken = async (id: number, secret?: string) => {
    const payload = { id };
    if (secret) {
        const token = sign(payload, secret, { expiresIn: '1d' })
        return ({
            success: true,
            token: token
        })
    } else {
        return ({
            success: false,
            msg: "your secret token hasn't been setted"
        })
    }

};
