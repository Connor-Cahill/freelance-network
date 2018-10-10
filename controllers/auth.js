const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');


module.exports = function(app) {
//////////GET ROUTES //////////

///SignUp Form
app.get('/signup', (req, res) => {
    res.render('sign-up.hbs');
});

//Login Form
app.get('/login', (req, res) => {
    res.render('login.hbs');
})

app.get('/logout', (req, res) => {
    res.clearCookie('cToken');
    res.redirect('/');
})


/////////POST ROUTES ///////////

///create new user (SIGNUP PAGE) //// TESTING ANOTHER SOLUTION BELOW CODE RUNS BUT DOESNT SAVE TO DB
app.post('/signup', (req, res) => {
    const user = new User(req.body);
    user.password = user.generateHash(req.body.password);
    ////Save user to DB
    user.save().then((savedUser) => {
        console.log('Saved user -----> ' + savedUser );
        const token = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn: '60 days'});
        res.cookie('cToken', token, { maxAge: 90000 , httpOnly: true });
        return res.redirect('/');
    }).catch(err => {
        console.log(err.message);
        return res.send(400).send({ err: err });
    });

});


////////LOGIN ROUTE /////////
app.post('/login', (req, res) => {
    // console.log('This is the request body ----> ' + req.body);
    // const user = User(req.body);
    //find username and password
    User.findOne({username: req.body.username}).then((user) => {
        console.log(user);
        // console.log(user)
        if (!user) {
            console.log('-----ERROR:USER------ ');
            return res.status(401).send({message: 'Wrong username or password'})
        } else if(!user.comparePassword(req.body.password)) {
            console.log('incorrect password')
            return res.status(401).send('Wrong Username or Password');
        } else {
            const token = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn: '60 days'});
            ///set cookie and redirect to index
            res.cookie('cToken', token, {maxAge: 90000, httpOnly: true});
            res.redirect('/');
        }

    }).catch(err => {
        console.log(err.message);
    })
})




}
