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
exports.ExamService = void 0;
const IRepository_1 = require("../repository/IRepository");
const iExamRepository = new IRepository_1.IExamRepository();
class ExamService {
    findAllExam(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield iExamRepository.findExam(query);
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
                const result = yield iExamRepository.createExam(body);
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
                const result = yield iExamRepository.updateExam(body, id);
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
                const result = yield iExamRepository.deleteExam(id);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ExamService = ExamService;
