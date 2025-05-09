
import { compare } from "bcryptjs";
import { verify } from "jsonwebtoken"
export const checkActive = (active: boolean) => {
    if (active === false) {
        return ({
            success: false,
            msg: "this account is not active"
        })
    }
}
export const validateUser = async (password: string, currentPassword: string) => {
    const isValid = await compare(password, currentPassword);
    if (!isValid) {
        return {
            success: false,
            msg: "username or password is not correct!"
        }
    }
};
export const checkToken = (token: string | undefined) => {
    if (!token) {
        return {
            success: false,
            msg: "you are not logged in",
            id: undefined
        }
    }
}
export const checkTokenAvailble = async (token: string, secret: string) => {
    try {
        const result = verify(token, secret)
        if (typeof result === 'object' && 'id' in result) {
            const id: number = result.id
            return {
                success: true,
                id: id
            }
        } else {
            return {
                success: false,
                msg: "you have problem in your JWT",
                id: undefined
            }
        }
    } catch (error) {
        return {
            success: false,
            msg: "your token is expired",
            id: undefined
        }

    }
}
