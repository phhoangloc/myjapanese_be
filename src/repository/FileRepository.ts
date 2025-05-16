import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export class FileRepository {

    async findFile(query: any) {
        try {
            const result = await prisma.file.findMany({
                where: {
                    archive: query.archive ? query.archive : undefined,
                    id: query.id ? Number(query.id) : undefined,
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
    async createFile(body: any) {
        try {
            const result = await prisma.file.create({ data: body })
            return result
        } catch (error) {
            return error
        }
    }
    async deleteFile(id: number) {
        try {
            const result = await prisma.file.delete({ where: { id } })
            return result
        } catch (error) {
            return error
        }

    }
}

// export const PostFileRepository = async (req: CustomRequest) => {
//     const prisma = await connect()
//     const form = new IncomingForm();
//     const today = new Date();
//     form.parse(req, async (err: Error, fields: any, files: any) => {
//         if (err) {
//             throw err
//         } else {
//             const uploadFile = files && files.file;
//             const client = new Client();

//             await client.connect(sftpConfig).then(async () => {
//                 await client.put(uploadFile[0].filepath, process.env.FTP_PATH + moment(today).format("YYYY.MM.DD_hh-mm-ss") + "_" + uploadFile[0].originalFilename)
//                 await prisma.file.create({ data: { hostId: Number(req.id), name: moment(today).format("YYYY.MM.DD_hh-mm-ss") + "_" + uploadFile[0].originalFilename } })
//             });
//             client.end()
//         }
//     })
// }
// export const DeleteFileRepository = async (req: CustomRequest) => {
//     const prisma = await connect()
//     const user = await prisma.user.findFirst({ where: { id: Number(req.id) }, select: { position: true } })
//     const file = await prisma.file.findUnique({ where: { id: Number(req.query.id) } })
//     if (req.id === file?.hostId || user?.position === "admin") {
//         const client = new Client();
//         await client.connect(sftpConfig).then(async () => {
//             const result = file && await client.delete(process.env.FTP_PATH + file.name);
//             if (result) {
//                 await prisma.file.delete({ where: { id: Number(req.query.id) } })
//             } else {
//             }
//             client.end()
//         })
//     } else {
//         return ({
//             msg: "this file is not yours",
//             success: false
//         })

//     }
// }