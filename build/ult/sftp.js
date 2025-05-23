"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sftpConfig = void 0;
require('dotenv').config();
exports.sftpConfig = {
    host: "162.43.88.28",
    username: "locpham",
    password: process.env.SFTP_PASSWORD,
    port: 22
};
