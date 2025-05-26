import { NextFunction, Request, Response } from "express"
import { IExamService, IBlogService, IExerciseService, IFileService, IUserService, IDoHomeWorkService } from "../services/IServices"
import { saveCookie } from "../ult/cookie"
import { parse } from "cookie"
import { verify } from "jsonwebtoken"
import { User, UserType } from "../entity/user"
import { UserDTO } from "../DTO/user"
import { IncomingForm } from "formidable";
import Client from "ssh2-sftp-client"
import { sftpConfig } from "../ult/sftp"
import moment from "moment"
import { JSONParser } from "formidable/parsers"

const iUserService = new IUserService()
const iBlogService = new IBlogService()
const iFileService = new IFileService()
const iExerciseService = new IExerciseService()
const iExamService = new IExamService()
const iDoHomeWorkService = new IDoHomeWorkService()
interface CustomRequest extends Request {
    id?: number;
}
export class Controller {

    async findUser(req: Request, res: Response) {
        const query = req.query
        try {
            const result = await iUserService.findAllUser(query)
            const resultDTO = result.map((re: any) => new UserDTO(re))
            res.json({
                success: true,
                data: resultDTO
            })
        } catch (error: any) {
            res.status(400).json(error.message)
        }

    }
    async findUserByQuery(req: Request, res: Response) {
        const query = req.query
        try {
            const result: any = await iUserService.findOneUser(query)
            res.json({
                success: true,
                data: new UserDTO(result)
            })
        } catch (error: any) {
            res.status(400).json(error.message)
        }
    }
    async findUserById(req: CustomRequest, res: Response) {
        const id = req.id
        try {
            const result: any = await iUserService.findOneUser({ id })
            res.json({
                success: true,
                data: new UserDTO(result)
            })
        } catch (error: any) {
            res.status(400).json(error.message)
        }
    }
    async signup(req: Request, res: Response) {
        const body = req.body
        try {
            await iUserService.signup(body)
            res.json({
                success: true,
                msg: "check your email to active account!"
            })
        } catch (error: any) {
            res.status(400).json(error.message)
        }
    }
    async active(req: Request, res: Response) {
        const query = req.query
        try {
            await iUserService.active(query)
            res.json({
                success: true,
                msg: "your account is active"
            })
        } catch (error: any) {
            res.status(400).json(error.message)
        }
    }
    async login(req: Request, res: Response) {
        const body = req.body
        try {
            const token = await iUserService.login(body)
            if (token) {
                saveCookie(token, res)
                res.json({
                    success: true,
                    msg: "login success",
                })
            }
        } catch (error: any) {
            res.status(400).json(error.message)
        }
    }
    async logout(req: Request, res: Response) {
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
    async createUser(req: Request, res: Response) {
        const body = req.body
        try {
            await iUserService.signup(body)
            res.json({
                success: true,
                msg: "check your email to active account!"
            })
        } catch (error: any) {
            res.status(400).json(error.message)
        }
    }
}
export class BlogController {

    async findBlog(req: Request, res: Response) {
        const query = req.query
        try {
            const result = await iBlogService.findAllBlog(query)
            res.json({
                success: true,
                data: result
            })
        } catch (error: any) {
            res.status(400).json(error.message)
        }
    }
    async createBlog(req: CustomRequest, res: Response) {
        const body = req.body
        const newBody = body
        body.host = {
            connect: { id: req.id }
        }
        try {
            await iBlogService.createBlog(newBody)
            res.json({
                success: true,
                msg: "you have been post a blog"
            })
        } catch (error: any) {
            res.status(400).json(error.message)
        }
    }
    async updateBlog(req: CustomRequest, res: Response) {
        const query = req.query
        const id = Number(query.id)
        const body = req.body
        try {
            const blog = await iBlogService.findAllBlog({ id })
            if (blog[0].hostId != Number(req.id)) {
                throw new Error("you are not this blog 's owner")
            }
            await iBlogService.updateBlog(body, id)
            res.json({
                success: true,
                msg: "you have been update a blog"
            })
        } catch (error: any) {
            res.status(400).json(error.message)
        }
    }
    async deleteBlog(req: CustomRequest, res: Response) {
        const query = req.query
        const id = Number(query.id)
        try {
            await iBlogService.deleteBlog(id)
            res.json({
                success: true,
                msg: "you have been delete a blog"
            })
        } catch (error: any) {
            res.status(400).json(error.message)
        }
    }
}
export class ExerciseController {

    async findExercise(req: Request, res: Response) {
        const query = req.query
        try {
            const result = await iExerciseService.findAllExercise(query)
            res.json({
                success: true,
                data: result
            })
        } catch (error: any) {
            res.status(400).json(error.message)
        }
    }
    async createExercise(req: CustomRequest, res: Response) {
        const body = req.body
        const newBody = req.body
        const examIds = body.examIds
        newBody.exercise = {
            createMany: examIds ? { data: examIds.map((item: any) => ({ examId: item.id })) } : undefined
        }
        newBody.exeIds = undefined
        try {
            await iExerciseService.createExercise(body)
            res.json({
                success: true,
                msg: "you have been post a exercise"
            })
        } catch (error: any) {
            res.status(400).json(error.message)
        }
    }
    async updateExercise(req: CustomRequest, res: Response) {
        const query = req.query
        const id = Number(query.id)
        const body = req.body
        const newBody = req.body
        const examIds = body.examIds
        newBody.exam = {
            deleteMany: examIds ? {} : undefined,
            createMany: examIds ? { data: examIds.map((item: any) => ({ examId: item.id })) } : undefined
        }
        newBody.examIds = undefined
        try {
            await iExerciseService.updateExercise(newBody, id)
            res.json({
                success: true,
                msg: "you have been update a exercise"
            })
        } catch (error: any) {
            res.status(400).json(error.message)
        }
    }
    async deleteExercise(req: CustomRequest, res: Response) {
        const query = req.query
        const id = Number(query.id)
        try {
            await iExerciseService.deleteExercise(id)
            res.json({
                success: true,
                msg: "you have been delete a exercise"
            })
        } catch (error: any) {
            res.status(400).json(error.message)
        }
    }
}
export class FileController {

    async findFile(req: Request, res: Response) {
        const query = req.query
        try {
            const result = await iFileService.findAllFile(query)
            res.json({
                success: true,
                data: result
            })
        } catch (error: any) {
            res.status(400).json(error.message)
        }
    }
    async createfile(req: CustomRequest, res: Response) {
        const form = new IncomingForm();
        const today = new Date();
        try {
            form.parse(req, async (err: Error, fields: any, files: any) => {
                if (err) {
                    throw err
                } else {
                    const uploadFile = files && files.file;
                    const client = new Client();

                    const fileType = uploadFile[0].originalFilename.split(".")[uploadFile[0].originalFilename.split(".").length - 1]
                    await client.connect(sftpConfig).then(async () => {
                        await client.put(uploadFile[0].filepath, process.env.FTP_PATH + moment(today).format("YYYY.MM.DD_hh-mm-ss") + "_" + uploadFile[0].originalFilename)
                    });
                    client.end()
                    try {
                        await iFileService.createFile({ host: { connect: { id: Number(req.id) } }, name: moment(today).format("YYYY.MM.DD_hh-mm-ss") + "_" + uploadFile[0].originalFilename, type: fileType })
                        res.json({
                            success: true,
                            msg: "your file is uploaded successfully"
                        })
                    } catch (error) {
                        throw error
                    }
                }


            })

        } catch (error: any) {
            res.status(400).json(error.message)

        }
    }
    DeleteFile = async (req: CustomRequest, res: Response) => {
        try {
            const user = await iUserService.findOneUser(Number(req.id))
            if (!user) {
                throw new Error("this id is not exist")
            }
            const position = user.position
            const file = await iFileService.findAllFile({ id: Number(req.query.id) })
            if (!file) {
                throw new Error("this id is not exist")
            }
            const hostId = file[0].hostId
            const name = file[0].name

            if (req.id === hostId || position === "admin") {
                const client = new Client();
                await client.connect(sftpConfig).then(async () => {
                    const result = await client.delete(process.env.FTP_PATH + name);
                    if (result) {
                        await iFileService.deleteFile(Number(req.query.id))
                    } else {
                    }
                    client.end()
                })
                res.json({
                    msg: "this file is deleted successfully",
                    success: true
                })
            } else {
                res.json({
                    msg: "this file is not yours",
                    success: false
                })

            }
        } catch (error: any) {
            res.status(400).json(error.message)
        }

    }
}
export class ExamController {

    async findExam(req: Request, res: Response) {
        const query = req.query
        try {
            const result = await iExamService.findAllExam(query)
            res.json({
                success: true,
                data: result
            })
        } catch (error: any) {
            res.status(400).json(error.message)
        }
    }
    async createExam(req: CustomRequest, res: Response) {
        const body = req.body
        const newBody = body
        const exeIds: any[] = body.exeIds
        const userIds: any[] = body.userIds
        body.host = {
            connect: { id: req.id }
        }
        newBody.exercise = {
            createMany: exeIds ? { data: exeIds } : undefined
        }
        newBody.homeworker = {
            createMany: userIds ? { data: userIds } : undefined
        }
        newBody.exeIds = undefined
        newBody.userIds = undefined
        try {
            const result = await iExamService.createExam(newBody)
            res.json({
                success: true,
                msg: "you have been post a exam"
            })
        } catch (error: any) {
            res.status(400).json(error.message)
        }
    }
    async updateExam(req: CustomRequest, res: Response) {
        const query = req.query
        const id = Number(query.id)
        const body = req.body
        const newBody = body
        const exeIds: any[] = body.exeIds
        const userIds: any[] = body.userIds
        newBody.exercise = {
            deleteMany: exeIds ? {} : undefined,
            createMany: exeIds ? { data: exeIds } : undefined
        }
        newBody.homeworker = {
            deleteMany: userIds ? {} : undefined,
            createMany: userIds ? { data: userIds } : undefined
        }
        newBody.exeIds = undefined
        newBody.userIds = undefined
        try {
            const exam = await iExamService.findAllExam({ id })
            if (exam[0].hostId != Number(req.id)) {
                throw new Error("you are not this Exam 's owner")
            }

            const result = await iExamService.updateExam(newBody, id)
            console.log(result)
            res.json({
                success: true,
                msg: "you have been update an Exam"
            })

        } catch (error: any) {
            res.status(400).json(error.message)
        }
    }
    async doExam(req: CustomRequest, res: Response) {
        const query = req.query
        const userId = Number(req.id)
        const examId = Number(query.id)
        try {
            const result = await iExamService.updateExam({
                homeworkerdone: {
                    createMany: { data: [{ userId }] }
                }
            }, examId)
            res.json({
                success: true,
                msg: "you have been update an Exam"
            })
        } catch (error: any) {
            res.status(400).json(error.message)
        }
    }
    async finishExam(req: CustomRequest, res: Response) {
        const query = req.query
        const body = req.body
        const userId = Number(req.id)
        const examId = Number(query.id)
        const score = Number(body.score)
        try {
            const result = await iExamService.updateExam({
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
            }, examId)
            res.json({
                success: true,
                msg: "you have been submit an Exam"
            })
        } catch (error: any) {
            console.log(error)
            res.status(400).json(error.message)
        }
    }
    async deleteExam(req: CustomRequest, res: Response) {
        const query = req.query
        const id = Number(query.id)
        try {
            await iExamService.deleteExam(id)
            res.json({
                success: true,
                msg: "you have been delete a Exam"
            })
        } catch (error: any) {
            res.status(400).json(error.message)
        }
    }
}

export class DoHomeWorkController {
    async findResult(req: CustomRequest, res: Response) {
        const query = req.query
        const ids = {
            examId: Number(query.id),
            userId: req.id ? req.id : 0
        }
        try {
            const result = await iDoHomeWorkService.findAllDoHomeWork(query, ids)
            res.json({
                success: true,
                data: result
            })
        } catch (error: any) {
            res.status(400).json(error.message)
        }

    }
    async createHomeWork(req: CustomRequest, res: Response) {
        const body = req.body
        const userId = Number(req.id)
        const examId = Number(body.examId)

        try {
            await iDoHomeWorkService.createDoHomeWork({
                userId,
                examId,
            })
            res.json({
                success: true,
                msg: "you have been created an DoHomeWork"
            })
        } catch (error: any) {
            res.status(400).json(error.message)
        }
    }
    async updateHomeWork(req: CustomRequest, res: Response) {
        const query = req.query
        const body = req.body
        const userId = Number(req.id)
        const examId = Number(query.id)
        try {
            await iDoHomeWorkService.UpdateDoHomeWork(body, { examId, userId })
            res.json({
                success: true,
                msg: "you have been created an DoHomeWork"
            })
        } catch (error: any) {
            console.log(error)
            res.status(400).json(error.message)
        }
    }
}
export class Middlewares {

    position;

    constructor(position: string) {
        this.position = position;
        this.checkPosition = this.checkPosition.bind(this);
    }


    async checkPosition(req: CustomRequest, res: Response, next: NextFunction) {
        const cookies = req.headers.cookie;
        const token = cookies ? parse(cookies).token : null;
        try {
            if (!token) {
                throw new Error("you haven't logged in yet")
            }
            if (!process.env.SECRETTOKEN) {
                throw new Error("you haven't logged in yet")
            }
            const result = verify(token, process.env.SECRETTOKEN)
            if (typeof result !== 'object' || !result.id) {
                throw new Error("your token is expired")
            }
            const user = await iUserService.findOneUser({ id: result.id })
            if (!user) {
                throw new Error("id is not Existed")
            }
            if (user.position !== this.position && user.position !== "admin") {
                throw new Error("you don't have permission")
            }
            req.id = result.id
            next()
        } catch (error: any) {
            res.status(400).json(error.message)
        }
    }

}