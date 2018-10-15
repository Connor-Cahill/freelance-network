const express = require('express')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const postController = require('./controllers/posts-controller')
const commentController = require('./controllers/comments-controller');
const authController = require('./controllers/auth');
const adminController = require('./controllers/admin');
const projectsController = require('./controllers/projects-controller');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')




const app = express();



app.use(cookieParser());
mongoose.Promise = global.Promise

////passport config




//////CHECK IF USER IS AUTHORIZED /////////
const checkAuth = (req, res, next) => {
    console.log('Checking Auth-')
    if (typeof req.cookies.cToken === 'undefined' || req.cookies.cToken === null) {
        req.user = null;
    } else {
        const token = req.cookies.cToken
        const decodedToken = jwt.decode(token, {complete: true}) || {};
        req.user = decodedToken.payload;
    }
    next();
}

app.use(methodOverride('_method'))
app.use(checkAuth)
app.engine('hbs', exphbs({ defaultLayout: 'main.hbs' }))
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/netmake', {useNewUrlParser: true})
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

postController(app);
commentController(app);
authController(app);
adminController(app);
projectsController(app);





app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

module.exports = app;
