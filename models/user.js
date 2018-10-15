const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/netmake', {useNewUrlParser: true});
const bcrypt = require('bcrypt-nodejs');
// const mongoosePassport = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    createdAt: {type: Date},
    updatedAt: {type: Date},
    email: {type: String, required: true},
    password: {type: String, select: true},
    username: {type: String, required: true},
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]

})


UserSchema.pre('save', function(next) {
    //set created at and updated at
    const now = new Date();
    this.updateAt = now;
    if (! this.createdAt){
        this.createdAt = now;
    }
    next();

})
//     //Encrypt Password
//     const user = this;
//     if (! user.isModified('password')) {
//         return next();
//     }
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             user.password = hash;
//              return next();
//         });
//     });
// });

//generate Hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

//compare password
UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}
// UserSchema.methods.comparePassword = (password, done) => {
//     console.log('PRINT user.password --------> ' + password);
//     bcrypt.compare(password, this.password, (err, isMatch) => {
//         done(err, isMatch);
//     })
// }


module.exports = mongoose.model('User', UserSchema);
