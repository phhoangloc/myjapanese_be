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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middlewares = exports.ExamController = exports.FileController = exports.ExerciseController = exports.BlogController = exports.Controller = void 0;
const IServices_1 = require("../services/IServices");
const cookie_1 = require("../ult/cookie");
const cookie_2 = require("cookie");
const jsonwebtoken_1 = require("jsonwebtoken");
const user_1 = require("../DTO/user");
const formidable_1 = require("formidable");
const ssh2_sftp_client_1 = __importDefault(require("ssh2-sftp-client"));
const sftp_1 = require("../ult/sftp");
const moment_1 = __importDefault(require("moment"));
const iUserService = new IServices_1.IUserService();
const iBlogService = new IServices_1.IBlogService();
const iFileService = new IServices_1.IFileService();
const iExerciseService = new IServices_1.IExerciseService();
const iExamService = new IServices_1.IExamService();
class Controller {
    findUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            try {
                const result = yield iUserService.findAllUser(query);
                const resultDTO = result.map((re) => new user_1.UserDTO(re));
                res.json({
                    success: true,
                    data: resultDTO
                });
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
    findUserByQuery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            try {
                const result = yield iUserService.findOneUser(query);
                res.json({
                    success: true,
                    data: new user_1.UserDTO(result)
                });
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
    findUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.id;
            try {
                const result = yield iUserService.findOneUser({ id });
                res.json({
                    success: true,
                    data: new user_1.UserDTO(result)
                });
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            try {
                yield iUserService.signup(body);
                res.json({
                    success: true,
                    msg: "check your email to active account!"
                });
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
    active(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            try {
                yield iUserService.active(query);
                res.json({
                    success: true,
                    msg: "your account is active"
                });
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            try {
                const token = yield iUserService.login(body);
                if (token) {
                    (0, cookie_1.saveCookie)(token, res);
                    res.json({
                        success: true,
                        msg: "login success",
                    });
                }
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.clearCookie('token', {
                httpOnly: true,
                secure: true, // nếu bạn dùng HTTPS
                sameSite: 'strict' // hoặc 'lax' tùy theo setup
            });
            res.json({
                success: true,
                message: 'Logged out successfully'
            });
        });
    }
}
exports.Controller = Controller;
class BlogController {
    findBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            try {
                const result = yield iBlogService.findAllBlog(query);
                res.json({
                    success: true,
                    data: result
                });
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
    createBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const newBody = body;
            body.host = {
                connect: { id: req.id }
            };
            try {
                yield iBlogService.createBlog(newBody);
                res.json({
                    success: true,
                    msg: "you have been post a blog"
                });
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
    updateBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            const id = Number(query.id);
            const body = req.body;
            try {
                const blog = yield iBlogService.findAllBlog({ id });
                if (blog[0].hostId != Number(req.id)) {
                    throw new Error("you are not this blog 's owner");
                }
                yield iBlogService.updateBlog(body, id);
                res.json({
                    success: true,
                    msg: "you have been update a blog"
                });
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
    deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            const id = Number(query.id);
            try {
                yield iBlogService.deleteBlog(id);
                res.json({
                    success: true,
                    msg: "you have been delete a blog"
                });
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
}
exports.BlogController = BlogController;
class ExerciseController {
    findExercise(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            try {
                const result = yield iExerciseService.findAllExercise(query);
                res.json({
                    success: true,
                    data: result
                });
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
    createExercise(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const newBody = req.body;
            const examIds = body.examIds;
            newBody.exercise = {
                createMany: examIds ? { data: examIds.map((item) => ({ examId: item.id })) } : undefined
            };
            newBody.exeIds = undefined;
            try {
                yield iExerciseService.createExercise(body);
                res.json({
                    success: true,
                    msg: "you have been post a exercise"
                });
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
    updateExercise(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            const id = Number(query.id);
            const body = req.body;
            const newBody = req.body;
            const examIds = body.examIds;
            newBody.exam = {
                deleteMany: examIds ? {} : undefined,
                createMany: examIds ? { data: examIds.map((item) => ({ examId: item.id })) } : undefined
            };
            newBody.examIds = undefined;
            try {
                yield iExerciseService.updateExercise(newBody, id);
                res.json({
                    success: true,
                    msg: "you have been update a exercise"
                });
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
    deleteExercise(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            const id = Number(query.id);
            try {
                yield iExerciseService.deleteExercise(id);
                res.json({
                    success: true,
                    msg: "you have been delete a exercise"
                });
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
}
exports.ExerciseController = ExerciseController;
class FileController {
    constructor() {
        this.DeleteFile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield iUserService.findOneUser(Number(req.id));
                if (!user) {
                    throw new Error("this id is not exist");
                }
                const position = user.position;
                const file = yield iFileService.findAllFile({ id: Number(req.query.id) });
                if (!file) {
                    throw new Error("this id is not exist");
                }
                const hostId = file[0].hostId;
                const name = file[0].name;
                if (req.id === hostId || position === "admin") {
                    const client = new ssh2_sftp_client_1.default();
                    yield client.connect(sftp_1.sftpConfig).then(() => __awaiter(this, void 0, void 0, function* () {
                        const result = yield client.delete(process.env.FTP_PATH + name);
                        if (result) {
                            yield iFileService.deleteFile(Number(req.query.id));
                        }
                        else {
                        }
                        client.end();
                    }));
                    res.json({
                        msg: "this file is deleted successfully",
                        success: true
                    });
                }
                else {
                    res.json({
                        msg: "this file is not yours",
                        success: false
                    });
                }
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
    findFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            try {
                const result = yield iFileService.findAllFile(query);
                res.json({
                    success: true,
                    data: result
                });
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
    createfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = new formidable_1.IncomingForm();
            const today = new Date();
            try {
                form.parse(req, (err, fields, files) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        throw err;
                    }
                    else {
                        const uploadFile = files && files.file;
                        const client = new ssh2_sftp_client_1.default();
                        const fileType = uploadFile[0].originalFilename.split(".")[uploadFile[0].originalFilename.split(".").length - 1];
                        yield client.connect(sftp_1.sftpConfig).then(() => __awaiter(this, void 0, void 0, function* () {
                            yield client.put(uploadFile[0].filepath, process.env.FTP_PATH + (0, moment_1.default)(today).format("YYYY.MM.DD_hh-mm-ss") + "_" + uploadFile[0].originalFilename);
                        }));
                        client.end();
                        try {
                            yield iFileService.createFile({ host: { connect: { id: Number(req.id) } }, name: (0, moment_1.default)(today).format("YYYY.MM.DD_hh-mm-ss") + "_" + uploadFile[0].originalFilename, type: fileType });
                            res.json({
                                success: true,
                                msg: "your file is uploaded successfully"
                            });
                        }
                        catch (error) {
                            throw error;
                        }
                    }
                }));
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
}
exports.FileController = FileController;
class ExamController {
    findExam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            try {
                const result = yield iExamService.findAllExam(query);
                res.json({
                    success: true,
                    data: result
                });
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
    createExam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const newBody = body;
            const exeIds = body.exeIds;
            const userIds = body.userIds;
            body.host = {
                connect: { id: req.id }
            };
            newBody.exercise = {
                createMany: exeIds ? { data: exeIds } : undefined
            };
            newBody.homeworker = {
                createMany: userIds ? { data: userIds } : undefined
            };
            newBody.exeIds = undefined;
            newBody.userIds = undefined;
            try {
                const result = yield iExamService.createExam(newBody);
                res.json({
                    success: true,
                    msg: "you have been post a exam"
                });
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
    updateExam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            const id = Number(query.id);
            const body = req.body;
            const newBody = body;
            const exeIds = body.exeIds;
            const userIds = body.userIds;
            newBody.exercise = {
                deleteMany: exeIds ? {} : undefined,
                createMany: exeIds ? { data: exeIds } : undefined
            };
            newBody.homeworker = {
                deleteMany: userIds ? {} : undefined,
                createMany: userIds ? { data: userIds } : undefined
            };
            newBody.exeIds = undefined;
            newBody.userIds = undefined;
            try {
                const exam = yield iExamService.findAllExam({ id });
                if (exam[0].hostId != Number(req.id)) {
                    throw new Error("you are not this Exam 's owner");
                }
                const result = yield iExamService.updateExam(newBody, id);
                console.log(result);
                res.json({
                    success: true,
                    msg: "you have been update an Exam"
                });
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
    doExam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            const userId = Number(req.id);
            const examId = Number(query.id);
            try {
                const result = yield iExamService.updateExam({
                    homeworkerdone: {
                        createMany: { data: [{ userId }] }
                    }
                }, examId);
                res.json({
                    success: true,
                    msg: "you have been update an Exam"
                });
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
    finishExam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            const body = req.body;
            const userId = Number(req.id);
            const examId = Number(query.id);
            const score = Number(body.score);
            try {
                const result = yield iExamService.updateExam({
                    homeworkerdone: {
                        update: {
                            where: {
                                examId_userId: {
                                    userId,
                                    examId
                                }
                            },
                            data: { score }
                        }
                    }
                }, examId);
                res.json({
                    success: true,
                    msg: "you have been submit an Exam"
                });
            }
            catch (error) {
                console.log(error);
                res.status(400).json(error.message);
            }
        });
    }
    deleteExam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            const id = Number(query.id);
            try {
                yield iExamService.deleteExam(id);
                res.json({
                    success: true,
                    msg: "you have been delete a Exam"
                });
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
}
exports.ExamController = ExamController;
class Middlewares {
    constructor(position) {
        this.position = position;
        this.checkPosition = this.checkPosition.bind(this);
    }
    checkPosition(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const cookies = req.headers.cookie;
            const token = cookies ? (0, cookie_2.parse)(cookies).token : null;
            try {
                if (!token) {
                    throw new Error("you haven't logged in yet");
                }
                if (!process.env.SECRETTOKEN) {
                    throw new Error("you haven't logged in yet");
                }
                const result = (0, jsonwebtoken_1.verify)(token, process.env.SECRETTOKEN);
                if (typeof result !== 'object' || !result.id) {
                    throw new Error("your token is expired");
                }
                const user = yield iUserService.findOneUser({ id: result.id });
                if (!user) {
                    throw new Error("id is not Existed");
                }
                if (user.position !== this.position && user.position !== "admin") {
                    throw new Error("you don't have permission");
                }
                req.id = result.id;
                next();
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
    }
}
exports.Middlewares = Middlewares;
