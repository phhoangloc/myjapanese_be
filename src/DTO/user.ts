export type UserType = {
    id: number,
    username: string,
    password: string,
    email: string,
    position: string,
    active: boolean
}

export class UserDTO {

    id;
    username;
    email;
    position;
    active;

    constructor({ id, username, email, position, active }: UserType) {
        this.id = id
        this.username = username
        this.email = email
        this.position = position
        this.active = active
    }

}