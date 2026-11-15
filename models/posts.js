
export class Post {
    constructor(id, authorID, title, topic, content, image = null ){
        this.id = id;
        this.authorID = authorID;
        this.title = title;
        this.topic = topic;
        this.content = content;
        this.image = image;
        this.datePublished = new Date().toISOString();
        this.viewCount = 0;
    }
}