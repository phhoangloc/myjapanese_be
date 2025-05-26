import { Router } from "express";
import { Controller, BlogController, FileController, ExamController, DoHomeWorkController } from "../../controllers";

const userController = new Controller()
const blogController = new BlogController()
const fileController = new FileController()
const examController = new ExamController()
const doHomeWorkController = new DoHomeWorkController()
export const UserRouter = Router()

UserRouter.get("/", userController.findUserById)
UserRouter.get("/blog", blogController.findBlog)
UserRouter.get("/exam", examController.findExam)
UserRouter.get("/result", doHomeWorkController.findResult)
UserRouter.post("/exam", doHomeWorkController.createHomeWork)
UserRouter.put("/exam_submit", doHomeWorkController.updateHomeWork)
UserRouter.get("/file", fileController.findFile)
UserRouter.post("/logout", userController.logout)