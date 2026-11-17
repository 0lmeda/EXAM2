export class Bookmark {
    constructor(id,postID,userID){
        this.id = id;
        this.postID = postID;
        this.userID = userID;
        this.dateSave = new Date().toISOString();
    }
}