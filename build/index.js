"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
require('dotenv').config();
const port = process.env.PORT;
app.use((0, cors_1.default)({
    origin: process.env.ADMIN_URL,
    allowedHeaders: ['Content-Type', 'Authorization'], // header được phép gửi
    credentials: true, // cho phép gửi cookie (nếu có)
}));
app.use(body_parser_1.default.json());
(0, routes_1.route)(app);
app.listen(port, () => {
    console.log("server is running with port - " + port);
});
