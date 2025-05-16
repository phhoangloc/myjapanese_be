export type UserType = {
    id: number,
    username: string,
    password: string,
    email: string,
    position: string,
    active: boolean
}

export class User {

    id;
    username;
    password;
    email;
    position;
    active;

    constructor({ id, username, password, email, position, active }: UserType) {
        if (!/\S+@\S+\.\S+/.test(email) && email.length != 0) {
            throw new Error("your email is not valid")
        } if (username.length < 6) {
            throw new Error('Username must be at least 6 characters');
        }
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }
        this.id = id
        this.username = username
        this.password = password
        this.email = email
        this.position = position
        this.active = active
    }
}