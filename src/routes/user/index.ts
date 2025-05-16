import { Router } from "express";
import { Controller, BlogController, FileController, ExamController } from "../../controllers";

const userController = new Controller()
const blogController = new BlogController()
const fileController = new FileController()
const examController = new ExamController()
export const UserRouter = Router()

UserRouter.get("/", userController.findUserById)
UserRouter.get("/blog", blogController.findBlog)
UserRouter.get("/exam", examController.findExam)
UserRouter.get("/file", fileController.findFile)
UserRouter.post("/logout", userController.Logout)