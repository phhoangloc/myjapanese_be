import express from "express"
import { route } from "./routes"
import bodyParser from "body-parser"
import cors from "cors"

const app = express()

require('dotenv').config()

const port = process.env.PORT

app.use(cors({
    origin: process.env.ADMIN_URL,
    allowedHeaders: ['Content-Type', 'Authorization'], // header được phép gửi
    credentials: true, // cho phép gửi cookie (nếu có)
}))

app.use(bodyParser.json())

route(app)

app.listen(port, () => {
    console.log("server is running with port - " + port)
})