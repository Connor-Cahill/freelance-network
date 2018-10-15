const chai = require('chai');
const chaiHttp = require('chai-http');
const Post = require('../models/post');
const app = require('../server.js');
const should = chai.should();

chai.use(chaiHttp);

const samplePost = {title: 'Testing Post', content: 'This is a test post ... ', postType: 'question', category: 'art' };

describe('Post', () => {
    it('Should get New Post Form GET /posts/new', (done) => {
        chai.request(app)
        .get('/posts/new')
        .end((err, res) => {
            if(err){done(err)}
            res.status.should.be.equal(200)
            res.should.be.html
            done();
        })
    })
    it('Should POST new post to /posts', (done) => {
        chai.request(app)
        .post('/posts')
        .send(new Post(samplePost))
        .end((err, res) => {
            if(err) {done(err)}
            res.status.should.be.equal(200)
            res.should.be.html
            done();
        })
    })
    it('Should show single post at GET /posts/:postId', (done) => {
        const post = new Post(samplePost)
        post.save((err, post) => {
            console.log('This is the data ----------> ' + post);
            chai.request(app)
            .get(`/posts/${post._id}`)
            .end((err, res) => {
                if(err) {done(err)}
                res.status.should.be.equal(200)
                res.should.be.html;
                done();
            })
        })
    })
})
