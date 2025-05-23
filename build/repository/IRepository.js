"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IExamRepository = exports.IExerciseRepository = exports.IFileRepository = exports.IBlogRepository = exports.IUserRepository = void 0;
const UserRepository_1 = require("./UserRepository");
const BlogRepository_1 = require("./BlogRepository");
const FileRepository_1 = require("./FileRepository");
const ExerciseRepository_1 = require("./ExerciseRepository");
const ExamRepository_1 = require("./ExamRepository");
class IUserRepository extends UserRepository_1.UserRepository {
}
exports.IUserRepository = IUserRepository;
class IBlogRepository extends BlogRepository_1.BlogRepository {
}
exports.IBlogRepository = IBlogRepository;
class IFileRepository extends FileRepository_1.FileRepository {
}
exports.IFileRepository = IFileRepository;
class IExerciseRepository extends ExerciseRepository_1.ExerciseRepository {
}
exports.IExerciseRepository = IExerciseRepository;
class IExamRepository extends ExamRepository_1.ExamRepository {
}
exports.IExamRepository = IExamRepository;
