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
exports.UserRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserRepository {
    findUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prisma.user.findMany({
                    where: {
                        id: query.id ? query.id : undefined,
                    }
                });
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findOneUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prisma.user.findFirst({
                    where: {
                        id: query.id ? Number(query.id) : undefined,
                        username: query.username ? query.username : undefined,
                        email: query.email ? query.email : undefined
                    }
                });
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prisma.user.create({ data: body });
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateUser(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prisma.user.update({ where: { id }, data: body });
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserRepository = UserRepository;
