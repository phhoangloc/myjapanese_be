import { PrismaClient } from "@prisma/client"
import { User, UserType } from "../entity/user"
const prisma = new PrismaClient()
export class UserRepository {

    async findUser(query: any) {
        try {
            const result = await prisma.user.findMany({
                where: {
                    id: query.id ? query.id : undefined,
                }
            })
            return result
        } catch (error) {
            throw error
        }
    }
    async findOneUser(query: any) {
        try {
            const result = await prisma.user.findFirst({
                where: {
                    id: query.id ? Number(query.id) : undefined,
                    username: query.username ? query.username : undefined,
                    email: query.email ? query.email : undefined
                }
            })
            return result
        } catch (error) {
            throw error
        }
    }
    async createUser(body: any) {
        try {
            const result = await prisma.user.create({ data: body })
            return result
        } catch (error) {
            throw error
        }
    }
    async updateUser(id: number, body: any) {
        try {
            const result = await prisma.user.update({ where: { id }, data: body })
            return result
        } catch (error) {
            throw error
        }
    }
}