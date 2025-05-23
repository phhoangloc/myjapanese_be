"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = void 0;
class UserDTO {
    constructor({ id, username, email, position, active }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.position = position;
        this.active = active;
    }
}
exports.UserDTO = UserDTO;
