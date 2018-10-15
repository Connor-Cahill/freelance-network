/////POSTS CONTROLLER

const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');


module.exports = function(app) {

    ///GET ROUTES//////////////////////////

    //Index
    app.get('/', (req, res) => {
        const curUser = req.user;

        Post.find({}).populate({path: 'author'}).then(post => {
            console.log('This is the curUSer ---> ' + curUser);
            res.render('posts-index.hbs', { posts: post, curUser: curUser });
        }).catch(err => {
            console.log(err.message);
        });
    });

    // GET new posts page
    app.get('/posts/new', (req, res) => {
        res.render('posts-new.hbs')
})

////    SHOW INDIVIUAL POST
app.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id).populate('author').populate({
        path: 'comments',
        populate: {path: 'author'}
    }).then(post => {
        res.render('posts-show.hbs', {post});
    }).catch(err => {
        console.log(err.message);
    })
})


//---------CATEGORY FILTER---------//
app.get('/n/:category', (req, res) => {
    const curUser = req.user;
    Post.find({ category: req.params.category}).then(posts => {
        console.log(req.params.category);
        console.log('this is a post -----> ' + posts );
        res.render('posts-index.hbs', {posts: posts, curUser: curUser})
    }).catch(err => {
        console.log(err.message);
    })
})




app.post('/n/:category', (req, res) => {
    if(req.user) {
        Post.find({ category: req.params.category}).then((post) => {
            res.render('posts-index.hbs', {post: post})
        }).catch(err => {
            console.log(err.message);
        })
    } else {
        console.log('User is not singned in ... ')
        return res.status(401).send('You need to be signed in to do that!');
    }

})


////------FILTER POST BY USER ---- ////

app.get('/users/:username/posts', (req, res) => {
    User.findOne({username: req.params.username}).populate('posts').then(user => {
        res.render('user-posts.hbs', {user: user});
    }).catch(err => {
        console.log(err.message);
    })
})








    ////POST ROUTES////////////////////////////////////

    //post new post
    app.post('/posts', (req, res) => {
        if(req.user) {
            const post = new Post(req.body);
            post.author = req.user._id;
            //save post to DB
            post.save((err, response) => {
                return User.findById(req.user._id).then(user => {
                    user.posts.unshift(post);
                    user.save();
                    res.redirect('/');
                }).catch(err => {
                    console.log( + err.message);
                })
            })
        } else {
            console.log('user is not signed in ');
            return res.status(401).send('You need to be signed in to do that');
        }
    })


}
