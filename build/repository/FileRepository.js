"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class FileRepository {
    findFile(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prisma.file.findMany({
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
                });
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createFile(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prisma.file.create({ data: body });
                return result;
            }
            catch (error) {
                return error;
            }
        });
    }
    deleteFile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prisma.file.delete({ where: { id } });
                return result;
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.FileRepository = FileRepository;
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
