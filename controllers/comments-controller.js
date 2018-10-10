const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');


module.exports = function(app) {
    ///Post new Comment
    app.post('/posts/:postId/comments', (req, res) => {
        if(req.user) {
            const comment = new Comment(req.body);
            comment.author = req.user._id;

            /////save comments to DB and pair with posts
            comment.save().then(comment => {
                return User.findById(req.user._id)
            }).then(user => {
                user.comments.unshift(comment);
                user.save();
                return Post.findById(req.params.postId)
            }).then(post => {
                post.comments.unshift(comment)
                return post.save();
            }).then(post => {
                return res.redirect(`/posts/${post._id}`);
            }).catch(err => {
                console.log(err.message)
            })
        } else {
            res.status(401).send('You need to be signed in to do that.');
        }

    })


}
