import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export class DoHomeWorkRepository {

    async findResult(query: any, ids: { examId: number, userId: number }) {
        try {
            const result = await prisma.dohomework.findMany({
                where: {
                    examId: ids.examId ? Number(ids.examId) : undefined,
                    userId: ids.userId ? Number(ids.userId) : undefined
                },
                include: {
                    user: {
                        select: { id: true, username: true }
                    },
                    exam: {
                        include: {
                            exercise: {
                                include: {
                                    exer: {
                                        select: {
                                            question: true,
                                            choose: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                skip: query.skip ? Number(query.skip) : undefined,
                take: query.limit ? Number(query.limit) : undefined,
                orderBy: {
                    createdAt: 'desc',
                },
            })
            return result
        } catch (error) {
            throw error
        }

    }
    async createResult(body: any) {
        try {
            const result = await prisma.dohomework.create({ data: body })
            return result
        } catch (error) {
            throw error
        }
    }
    async updateResult(body: any, ids: { examId: number, userId: number }) {
        try {
            const result = await prisma.dohomework.update({
                where: {
                    examId_userId: ids
                },
                data: body,
            })
            return result
        } catch (error) {
            throw error

        }
    }
    async deleteResult(ids: { examId: number, userId: number }) {
        try {
            const result = await prisma.dohomework.delete({ where: { examId_userId: ids } })
            return result
        } catch (error) {
            throw error
        }

    }
}