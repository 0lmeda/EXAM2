export class Comments {
    constructor(id,postID, userID, text){
        this.id = id;
        this.postID = postID;
        this.userID = userID;
        this.text = text;
        this.date = new Date().toISOString();
    }
}