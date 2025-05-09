
import { UserRepository } from "../repository/user";
import { checkActive, validateUser } from "../ult/check"
import { generateToken } from "../ult/jwt";

const Anonimous = new UserRepository()
export class LoginService {

    async login(body: any) {
        const username = body.username
        const password = body.password
        const result = await Anonimous.getUserForlogin({ username });
        const user = result.success ? result.data[0] : undefined
        if (user) {
            const isToken = checkActive(user.active)
                || await validateUser(password, user.password)
                || await generateToken(user.id, process.env.SECRETTOKEN)
            const token = "token" in isToken ? isToken.token : ""
            return ({
                success: true,
                token: token
            })
        } else {
            return ({
                success: false,
                msg: "username or password is not correct!"
            })
        }
    }
}