import { Request, Response } from "express"
import { UserRepository } from "../repository/user"
import { SignupService } from "../services/signup.service";
import { LoginService } from "../services/login.service";
import { saveCookie } from "../ult/cookie";
import { BlogRepository } from "../repository/blog";
const user = new UserRepository()
const blog = new BlogRepository()
const signupService = new SignupService()
const loginService = new LoginService()
interface CustomRequest extends Request {
    id?: number;
}
export class Controller {

    postion;
    constructor(position?: string) {
        this.postion = position ? position : ""
    }
    HelloWorld(req: Request, res: Response) {
        res.json("hello world")
    }

    async UserNameExits(req: Request, res: Response) {
        const result = await user.isUserNameExist(req.query)
        res.json(result)
    }
    async EmailExits(req: Request, res: Response) {
        const result = await user.isEmailExist(req.query)
        res.json(result)
    }
    async SignUp(req: Request, res: Response) {
        const result = await signupService.signUp(req.body)
        res.json(result)
    }
    async Login(req: Request, res: Response) {
        const result = await loginService.login(req.body)
        if (result.token) {
            const token = result.token
            const isSaveResult = saveCookie(token, res)
            res.json(isSaveResult)
        }
    }
    async Logout(req: Request, res: Response) {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true, // nếu bạn dùng HTTPS
            sameSite: 'strict' // hoặc 'lax' tùy theo setup
        });

        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    }
    async Active(req: Request, res: Response) {
        const query = req.query
        const userQuery = await user.getUser({ email: query.email })
        const idQuery = userQuery.data[0].id
        const result = await user.UpdateUser({ id: idQuery }, { active: true })
        if (result.success) {
            res.send("your account is active")
        }
    }
    async GetOneUser(req: CustomRequest, res: Response) {
        const result = await user.getUser({ id: req.id })
        if (result.success) {
            res.json({
                success: result.success,
                data: result.data[0]
            })
        } else {
            res.json(result)
        }
    }
    async GetManyUser(req: CustomRequest, res: Response) {
        const result = await user.getUser(req.query)
        res.json(result)

    }
    async CreateUser(req: CustomRequest, res: Response) {
        const result = await user.createUser(req.body)
        res.json(result)

    }
    async GetManyBlog(req: CustomRequest, res: Response) {
        const result = await blog.getBlog(req.query)
        res.json(result)
    }
    async CreateBlog(req: CustomRequest, res: Response) {
        const body = req.body
        body.hostId = req.id
        const result = await blog.createBlog(body)
        res.json(result)
    }
    async UpdateBlog(req: CustomRequest, res: Response) {
        const query = req.query
        const body = req.body
        body.hostId = req.id
        const id = Number(query.id)
        const currentBlog = await blog.getBlog({ id })
        const currentHostId = currentBlog.data?.[0]?.host.id
        if (currentHostId === req.id || this.postion === "admin") {
            const result = await blog.updateBlog(body, id)
            res.json(result)
        } else {
            res.json({
                success: false,
                msg: "you dont have authorization to update this blog"
            })
        }
    }
    async DeleteBlog(req: CustomRequest, res: Response) {
        const query = req.query
        const body = req.body
        const id = Number(query.id)
        const currentBlog = await blog.getBlog({ id })
        const currentHostId = currentBlog.data?.[0]?.host.id
        if (currentHostId === req.id || this.postion === "admin") {
            const result = await blog.deleteBlog(id)
            res.json(result)
        } else {
            res.json({
                success: false,
                msg: "you dont have authorization to delete this blog"
            })
        }
    }
}
