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
exports.ExamRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ExamRepository {
    findExam(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prisma.exam.findMany({
                    where: {
                        archive: query.archive ? query.archive : undefined,
                        id: query.id ? Number(query.id) : undefined,
                        homeworker: {
                            some: {
                                userId: query.examinee ? Number(query.examinee) : undefined
                            }
                        }
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
                                        username: true
                                    }
                                }
                            }
                        },
                        homeworkerdone: {
                            include: {
                                user: {
                                    select: {
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
                });
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createExam(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prisma.exam.create({ data: body });
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateExam(body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prisma.exam.update({
                    where: { id },
                    data: body,
                    include: {
                        exercise: true
                    },
                });
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteExam(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prisma.exam.delete({ where: { id } });
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ExamRepository = ExamRepository;
