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
exports.BlogRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class BlogRepository {
    findBlog(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prisma.blog.findMany({
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
                });
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createBlog(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prisma.blog.create({ data: body });
                return result;
            }
            catch (error) {
                return error;
            }
        });
    }
    updateBlog(body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prisma.blog.update({ where: { id }, data: body });
                return result;
            }
            catch (error) {
                return error;
            }
        });
    }
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prisma.blog.delete({ where: { id } });
                return result;
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.BlogRepository = BlogRepository;
