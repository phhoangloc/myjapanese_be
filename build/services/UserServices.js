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
exports.UserService = void 0;
const user_1 = require("../entity/user");
const IRepository_1 = require("../repository/IRepository");
const jwt_1 = require("../ult/jwt");
const mail_1 = require("../ult/mail");
const bcryptjs_1 = require("bcryptjs");
const bcryptjs_2 = require("bcryptjs");
const iUserRepository = new IRepository_1.IUserRepository();
class UserService {
    findAllUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield iUserRepository.findUser(query);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findUserByQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield iUserRepository.findUser(query);
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
                const result = yield iUserRepository.findOneUser(query);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    signup(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUsernameExist = yield iUserRepository.findOneUser({ username: body.username });
            if (isUsernameExist) {
                throw new Error("username is exited");
            }
            const isEmailExist = yield iUserRepository.findOneUser({ email: body.email });
            if (isEmailExist) {
                throw new Error("email is exited");
            }
            const salt = (0, bcryptjs_1.genSaltSync)(10);
            const mahoa_password = body.password && (0, bcryptjs_1.hashSync)(body.password.toString(), salt);
            body.password = mahoa_password;
            try {
                const newUser = new user_1.User(body);
                yield iUserRepository.createUser(newUser);
                yield (0, mail_1.sendMailToAcceptRegister)(body.email);
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    active(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield iUserRepository.findOneUser({ email: query.email });
                if (user) {
                    const id = user.id;
                    try {
                        const result = yield iUserRepository.updateUser(id, { active: true });
                        return result;
                    }
                    catch (error) {
                        throw error;
                    }
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield iUserRepository.findOneUser({ username: body.username });
            if (!user) {
                throw new Error("username is not correct");
            }
            if (!user.active) {
                throw new Error("your account is not active");
            }
            const isValid = yield (0, bcryptjs_2.compare)(body.password, user.password);
            if (!isValid) {
                throw new Error("password is not correct");
            }
            try {
                const isToken = yield (0, jwt_1.generateToken)(user.id, process.env.SECRETTOKEN);
                const token = isToken ? isToken : "";
                return token;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserService = UserService;
