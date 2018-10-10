const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/netmake', {useNewUrlParser: true});

const Schema = mongoose.Schema;

const PostSchema = new Schema ({
    title: {type: String, require: true},
    content: {type: String, require: true},
    postType: {type: String, require: true},
    category: {type: String, require: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
})


const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
