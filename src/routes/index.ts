import { Express } from "express";
import { BlogController, Controller, Middlewares } from "../controllers";
import { UserRouter } from "./user";
import { AdminRouter } from "./admin";
const controller = new Controller()
const blogController = new BlogController()
const userMiddlwear = new Middlewares("user")
const adminMiddlwear = new Middlewares("admin")
export const route = (app: Express) => {
    app.get("/api/checkuser", controller.findUserByQuery)
    app.post("/api/signup", controller.signup)
    app.get("/api/active", controller.active)
    app.post("/api/login", controller.login)
    app.get("/api/blog", blogController.findBlog)

    app.use("/api/user", userMiddlwear.checkPosition, UserRouter)
    app.use("/api/admin", adminMiddlwear.checkPosition, AdminRouter)
}