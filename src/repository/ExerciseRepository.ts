import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export class ExerciseRepository {

    async findExercise(query: any) {
        try {
            const result = await prisma.exercise.findMany({
                where: {
                    id: query.id ? Number(query.id) : undefined,
                    part: query.part ? query.part : undefined,
                    mondai: query.mondai ? query.mondai : undefined,
                },
                include: {
                    exam: {
                        include: {
                            exam: true
                        }
                    },
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

    async createExercise(body: any) {
        try {
            const result = await prisma.exercise.create({ data: body })
            return result
        } catch (error) {
            return error
        }

    }
    async updateExercise(body: any, id: number) {
        try {
            const result = await prisma.exercise.update({ where: { id }, data: body })
            return result
        } catch (error) {
            return error

        }
    }
    async deleteExercise(id: number) {
        try {
            const result = await prisma.exercise.delete({ where: { id } })
            return result
        } catch (error) {
            return error
        }

    }
}