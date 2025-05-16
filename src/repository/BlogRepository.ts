import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export class BlogRepository {

    async findBlog(query: any) {
        try {
            const result = await prisma.blog.findMany({
                where: {
                    archive: query.archive ? query.archive : undefined,
                    id: query.id ? Number(query.id) : undefined,
                    censor: query.censor === undefined ? undefined : query.censor === "" ? undefined : Boolean(query.censor),
                    content: {
                        contains: query.search ? query.search : undefined,
                    },
                    slug: query.slug ? query.slug : undefined,
                    hostId: query.hostId ? Number(query.hostId) : undefined
                },
                include: {
                    host: {
                        select: { id: true, username: true }
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

    async createBlog(body: any) {
        try {
            const result = await prisma.blog.create({ data: body })
            return result
        } catch (error) {
            return error
        }

    }
    async updateBlog(body: any, id: number) {
        try {
            const result = await prisma.blog.update({ where: { id }, data: body })
            return result
        } catch (error) {
            return error

        }
    }
    async deleteBlog(id: number) {
        try {
            const result = await prisma.blog.delete({ where: { id } })
            return result
        } catch (error) {
            return error
        }

    }
}