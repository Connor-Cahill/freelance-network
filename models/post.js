const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema ({
    title: {type: String, required: true},
    content: {type: String, required: true},
    postType: {type: String, required: true},
    category: {type: String, required: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})


const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
