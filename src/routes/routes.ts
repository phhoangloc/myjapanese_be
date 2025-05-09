import { Router } from "express";
import { Controller } from "../controller";
export const UserRouter = Router()
export const AdminRouter = Router()
const UserController = new Controller("user")
const AdminController = new Controller("admin")
// user
UserRouter.get("/", UserController.GetOneUser)
UserRouter.get("/blog", UserController.GetManyBlog)

// admin
AdminRouter.get("/user", AdminController.GetManyUser)
AdminRouter.post("/user", AdminController.CreateUser)
//amin//log out
AdminRouter.post("/logout", AdminController.Logout)
//admin // blog
AdminRouter.get("/blog", AdminController.GetManyBlog)
AdminRouter.post("/blog", AdminController.CreateBlog)
AdminRouter.put("/blog", AdminController.UpdateBlog)
AdminRouter.delete("/blog", AdminController.DeleteBlog)
