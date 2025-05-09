import { validate } from "../ult/validate";
import { UserRepository } from "../repository/user";
import { sendMailToAcceptRegister } from "../ult/mail";
const Anonimous = new UserRepository()
export class SignupService {

    async signUp(body: any) {
        const valueError = await validate(body)

        if (valueError) {
            return (valueError)
        } else {
            try {
                await Anonimous.createUser(body)
                await sendMailToAcceptRegister(body.email)
                return ({
                    success: true,
                    msg: "please check your email to active your account"
                })
            } catch (error) {
                return ({
                    success: false,
                    msg: "you have an error please check again to sign up"
                })
            }
        }
    }
}
