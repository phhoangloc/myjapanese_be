import { Express } from "express";
import { Controller } from "../controller";
import { MiddleWare } from "../middleware/middleware";
import { AdminRouter, UserRouter } from "./routes";
const Anonimous = new Controller()
const userMiddleWare = new MiddleWare("user")
const adminMiddleWare = new MiddleWare("admin")
const bind = (instance: any, methodName: string) => instance[methodName].bind(instance);

export const route = (app: Express) => {
    app.get("/api/checkuser", Anonimous.UserNameExits || Anonimous.EmailExits)
    app.post("/api/signup", Anonimous.SignUp)
    app.post("/api/login", Anonimous.Login)
    app.get("/api/active", Anonimous.Active)
    app.get("/api/blog", Anonimous.GetManyBlog)

    app.use("/api/user", bind(userMiddleWare, 'forward'), UserRouter)
    app.use("/api/admin", bind(adminMiddleWare, 'forward'), AdminRouter)
    app.use("/api", Anonimous.HelloWorld)
}