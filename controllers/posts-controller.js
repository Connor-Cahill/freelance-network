/////POSTS CONTROLLER

const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports = function(app) {

    ///GET ROUTES//////////////////////////

    //Index
    app.get('/', (req, res) => {
        Post.find({}).then(post => {
            res.render('posts-index.hbs', { posts: post });
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
    Post.findById(req.params.id).populate('comments').then(post => {
        res.render('posts-show.hbs', {post});
    }).catch(err => {
        console.log(err.message);
    })
})


///////CATEGORY FILTER
app.get('/n/:category', (req, res) => {
    Post.find({ category: req.params.category}).then(post => {
        console.log(req.params.category);
        res.render('posts-index.hbs', {post: post})
    }).catch(err => {
        console.log(err.message);
    })
})

app.post('/n/:category', (req, res) => {
    Post.find({ category: req.params.category}).then((post) => {
        res.render('posts-index.hbs', {post: post})
    })
})




    ////POST ROUTES////////////////////////////////////

    //post new post
    app.post('/posts', (req, res) => {
        const post = new Post(req.body);
        //save post to DB
        post.save((err, response) => {
            // console.log('This is the saved res -----> ' + response)
            res.redirect('/');
        })

    })


}
