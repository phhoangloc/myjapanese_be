"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCookie = void 0;
const cookie_1 = require("cookie");
const saveCookie = (token, res) => {
    res.setHeader('Set-Cookie', (0, cookie_1.serialize)('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        path: '/',
        sameSite: 'none',
    }));
};
exports.saveCookie = saveCookie;
