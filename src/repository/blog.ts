import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export class BlogRepository {

    async getBlog(query: any) {
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
            return {
                success: true,
                data: result
            }
        } catch (error: any) {
            return {
                success: false,
                msg: error.message
            }
        }

    }
    async createBlog(body: any) {
        const newBody = body
        newBody.host = {
            connect: {
                id: body.hostId
            }
        }
        newBody.hostId = undefined
        try {
            const result = await prisma.blog.create({ data: newBody })
            return {
                success: true,
                data: result
            }
        } catch (error: any) {
            return {
                success: false,
                msg: error.message
            }
        }

    }
    async updateBlog(body: any, id: number) {
        const newBody = body
        newBody.host = {
            connect: {
                id: body.hostId
            }
        }
        newBody.hostId = undefined
        try {
            const result = await prisma.blog.update({ where: { id }, data: newBody })
            return {
                success: true,
                data: result
            }
        } catch (error: any) {
            return {
                success: false,
                msg: error.message
            }
        }
    }
    async deleteBlog(id: number) {
        try {
            const result = await prisma.blog.delete({ where: { id } })
            return {
                success: true,
                data: result
            }
        } catch (error: any) {
            return {
                success: false,
                msg: error.message
            }
        }

    }
}