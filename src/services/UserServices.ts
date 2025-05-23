import { User } from "../entity/user";
import { IUserRepository } from "../repository/IRepository";
import { generateToken } from "../ult/jwt";
import { sendMailToAcceptRegister } from "../ult/mail";
import { genSaltSync, hashSync } from "bcryptjs";
import { compare } from "bcryptjs";

const iUserRepository = new IUserRepository()
export class UserService {

    async findAllUser(query: any) {
        try {
            const result = await iUserRepository.findUser(query)
            return result
        } catch (error) {
            throw error
        }
    }
    async findUserByQuery(query: any) {
        try {
            const result = await iUserRepository.findUser(query)
            return result
        } catch (error) {
            throw error
        }
    }
    async findOneUser(query: any) {
        try {
            const result = await iUserRepository.findOneUser(query)
            return result
        } catch (error) {
            throw error
        }
    }
    async signup(body: any) {
        const isUsernameExist = await iUserRepository.findOneUser({ username: body.username })
        if (isUsernameExist) {
            throw new Error("username is exited")
        }
        const isEmailExist = await iUserRepository.findOneUser({ email: body.email })
        if (isEmailExist) {
            throw new Error("email is exited")
        }
        const salt = genSaltSync(10);

        const mahoa_password = body.password && hashSync(body.password.toString(), salt);
        body.password = mahoa_password
        try {
            const newUser = new User(body)
            await iUserRepository.createUser(newUser)
            await sendMailToAcceptRegister(body.email)
            return true
        } catch (error) {
            throw error
        }
    }
    async active(query: any) {
        try {
            const user = await iUserRepository.findOneUser({ email: query.email })
            if (user) {
                const id = user.id
                try {
                    const result = await iUserRepository.updateUser(id, { active: true })
                    return result
                } catch (error) {
                    throw error
                }
            }
        } catch (error) {
            throw error
        }


    }
    async login(body: any) {
        const user = await iUserRepository.findOneUser({ username: body.username })
        if (!user) {
            throw new Error("username is not correct")
        }
        if (!user.active) {
            throw new Error("your account is not active")
        }

        const isValid = await compare(body.password, user.password);
        if (!isValid) {
            throw new Error("password is not correct")
        }

        try {
            const isToken = await generateToken(user.id, process.env.SECRETTOKEN)
            const token = isToken ? isToken : ""
            return token
        } catch (error) {
            throw error
        }


    }
    async createUser(body: any) {
        const isUsernameExist = await iUserRepository.findOneUser({ username: body.username })
        if (isUsernameExist) {
            throw new Error("username is exited")
        }
        const isEmailExist = await iUserRepository.findOneUser({ email: body.email })
        if (isEmailExist) {
            throw new Error("email is exited")
        }
        const salt = genSaltSync(10);

        const mahoa_password = body.password && hashSync(body.password.toString(), salt);
        body.password = mahoa_password
        try {
            const newUser = new User(body)
            await iUserRepository.createUser(newUser)
            return true
        } catch (error) {
            throw error
        }
    }
}