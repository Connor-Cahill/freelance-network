const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/netmake', {useNewUrlParser: true});

const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
    content: {type: String, required: true},
    postId: {type: Schema.Types.ObjectId, ref: 'Post' }
})


const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
