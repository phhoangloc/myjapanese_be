import { Router } from "express";
import { Controller, BlogController, FileController, ExerciseController, ExamController } from "../../controllers";

const adminController = new Controller()
const blogController = new BlogController()
const fileController = new FileController()
const exerciseController = new ExerciseController()
const examController = new ExamController()

export const AdminRouter = Router()

AdminRouter.get("/user", adminController.findUser)
AdminRouter.get("/blog", blogController.findBlog)
AdminRouter.post("/blog", blogController.createBlog)
AdminRouter.put("/blog", blogController.updateBlog)

AdminRouter.get("/exercise", exerciseController.findExercise)
AdminRouter.post("/exercise", exerciseController.createExercise)
AdminRouter.put("/exercise", exerciseController.updateExercise)
AdminRouter.delete("/exercise", exerciseController.deleteExercise)

AdminRouter.get("/exam", examController.findExam)
AdminRouter.post("/exam", examController.createExam)
AdminRouter.put("/exam", examController.updateExam)
AdminRouter.delete("/exam", examController.deleteExam)

AdminRouter.get("/file", fileController.findFile)
AdminRouter.post("/file", fileController.createfile)
AdminRouter.delete("/file", fileController.DeleteFile)


AdminRouter.post("/logout", adminController.logout)
