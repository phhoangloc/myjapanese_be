import { PrismaClient } from "@prisma/client";
import { genSaltSync, hashSync } from "bcryptjs";

const prisma = new PrismaClient()
export class UserRepository {
    async isUserNameExist(query: any) {
        try {
            const result = await prisma.user.findUnique({ where: { username: query.username } })
            if (result && result.id) {
                return true
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    }
    async isEmailExist(query: any) {
        try {
            const result = await prisma.user.findUnique({ where: { email: query.email } })
            if (result && result.id) {
                return true
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    }
    async getUserForlogin(body: any) {
        try {
            const result = await prisma.user.findMany({
                where: {
                    username: body.username
                },
                select: {
                    id: true,
                    password: true,
                    active: true,
                    position: true,
                }
            })
            return {
                success: true,
                data: result
            }
        } catch (error: any) {
            console.log(error)
            return {
                success: false,
                msg: error.message,
                data: []
            }
        }
    }
    async getUser(query: any) {
        try {
            const result = await prisma.user.findMany({
                where: {
                    id: query.id ? Number(query.id) : undefined,
                    email: query.email ? query.email : undefined
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    active: true,
                    position: true,

                }
            })
            return {
                success: true,
                data: result
            }
        } catch (error: any) {
            console.log(error)
            return {
                success: false,
                msg: error.message,
                data: []
            }
        }
    }
    async createUser(body: any) {
        const salt = genSaltSync(10);
        const mahoa_password = body.password && hashSync(body.password.toString(), salt);
        body.password = mahoa_password
        try {
            const result = await prisma.user.create({ data: body })
            return {
                success: true,
                data: result
            }
        } catch (error: any) {
            console.log(error)
            return {
                success: false,
                msg: error.message,
                data: []
            }
        }
    }
    async UpdateUser(query: any, body: any) {
        try {
            const result = await prisma.user.update({ where: { id: query.id }, data: body })
            return {
                success: true,
                data: result
            }
        } catch (error: any) {
            console.log(error)
            return {
                success: false,
                msg: error.message,
            }
        }
    }
}