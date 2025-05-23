"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IExamService = exports.IExerciseService = exports.IFileService = exports.IBlogService = exports.IUserService = void 0;
const UserServices_1 = require("./UserServices");
const BlogServices_1 = require("./BlogServices");
const FileServices_1 = require("./FileServices");
const ExerciseServices_1 = require("./ExerciseServices");
const ExamServices_1 = require("./ExamServices");
class IUserService extends UserServices_1.UserService {
}
exports.IUserService = IUserService;
class IBlogService extends BlogServices_1.BlogService {
}
exports.IBlogService = IBlogService;
class IFileService extends FileServices_1.FileService {
}
exports.IFileService = IFileService;
class IExerciseService extends ExerciseServices_1.ExerciseService {
}
exports.IExerciseService = IExerciseService;
class IExamService extends ExamServices_1.ExamService {
}
exports.IExamService = IExamService;
