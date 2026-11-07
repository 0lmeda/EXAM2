export class User{
    constructor(id, username, passwordHash, role = "student"){
        this.id = id;
        this.username = username;
        this.passwordHash = passwordHash;
        this.role = role;
    }
}