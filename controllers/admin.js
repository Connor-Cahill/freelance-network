const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

module.exports = function(app) {
    ///Get admin dashboard
    app.get('/admin', (req, res) => {
        Post.find({}).then(posts => {
            res.render('admin.hbs', {posts});
        }).catch(err => {
            console.log(err.message);
        })
    })

    //delete Posts
    app.delete('/admin/posts/:id',(req, res) => {
        Post.findByIdAndRemove(req.params.id).then(posts => {
            res.redirect('/admin');
        }).catch(err => {
            console.log(err.message);
        })
    })
}
