class Post {
  constructor(id, title, content, user_id, created_at, updated_at) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.user_id = user_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

module.exports = Post;