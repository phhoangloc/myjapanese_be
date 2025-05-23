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
exports.ExerciseService = void 0;
const IRepository_1 = require("../repository/IRepository");
const iExerciseRepository = new IRepository_1.IExerciseRepository();
class ExerciseService {
    findAllExercise(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield iExerciseRepository.findExercise(query);
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
                const result = yield iExerciseRepository.createExercise(body);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateExercise(body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield iExerciseRepository.updateExercise(body, id);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteExercise(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield iExerciseRepository.deleteExercise(id);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ExerciseService = ExerciseService;
