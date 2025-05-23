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
exports.BlogService = void 0;
const IRepository_1 = require("../repository/IRepository");
const iBlogRepository = new IRepository_1.IBlogRepository();
class BlogService {
    findAllBlog(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield iBlogRepository.findBlog(query);
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
                const result = yield iBlogRepository.createBlog(body);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateBlog(body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield iBlogRepository.updateBlog(body, id);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield iBlogRepository.deleteBlog(id);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.BlogService = BlogService;
