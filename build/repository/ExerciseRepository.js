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
exports.ExerciseRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ExerciseRepository {
    findExercise(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prisma.exercise.findMany({
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
                });
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createExercise(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prisma.exercise.create({ data: body });
                return result;
            }
            catch (error) {
                return error;
            }
        });
    }
    updateExercise(body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prisma.exercise.update({
                    where: { id },
                    data: body,
                    include: {
                        exam: true
                    },
                });
                return result;
            }
            catch (error) {
                return error;
            }
        });
    }
    deleteExercise(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prisma.exercise.delete({ where: { id } });
                return result;
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.ExerciseRepository = ExerciseRepository;
