import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export class ExamRepository {

    async findExam(query: any) {
        try {
            const result = await prisma.exam.findMany({
                where: {
                    archive: query.archive ? query.archive : undefined,
                    id: query.id ? Number(query.id) : undefined,
                    homeworker: query.examinee ? {
                        some: {
                            userId: Number(query.examinee)
                        }
                    } : undefined
                },
                include: {
                    exercise: {
                        include: {
                            exer: true
                        }
                    },
                    homeworker: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    username: true
                                }
                            }
                        }
                    },
                    homeworkerdone: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    username: true
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

    async createExam(body: any) {
        try {
            const result = await prisma.exam.create({ data: body })
            return result
        } catch (error) {
            throw error
        }

    }
    async updateExam(body: any, id: number) {
        try {
            const result = await prisma.exam.update({
                where: { id },
                data: body,
                include: {
                    exercise: true
                },
            })
            return result
        } catch (error) {
            throw error

        }
    }
    async deleteExam(id: number) {
        try {
            const result = await prisma.exam.delete({ where: { id } })
            return result
        } catch (error) {
            throw error
        }

    }
}