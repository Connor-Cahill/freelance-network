const chai = require('chai');
const chaiHttp = require('chai-http');
const Post = require('../models/post');
const User = require('../models/user')
const server = require('../server.js');
const should = chai.should();
chai.use(chaiHttp);

var agent = chai.request.agent(server);


const samplePost = {title: 'Testing Post', content: 'This is a test post ... ', postType: 'question', category: 'art' };

describe('Post', () => {
    it('Should get New Post Form GET /posts/new', (done) => {
        agent
        .get('/posts/new')
        .end((err, res) => {
            if(err){done(err)}
            res.status.should.be.equal(200)
            res.should.be.html
            done();
        })
    })
    before(done => {
        agent
        .post('/login')
        .send({ username: 'bro', password: 'bro'})
        .end(function(err, res) {
            done();
        })
    })
    it('Should POST new post to /posts', (done) => {
        agent
        .post('/posts')
        .send(samplePost)
        .end((err, res) => {
            if(err) {
                done(err)
            }
            res.status.should.be.equal(200)
            res.should.be.html
            done();
        })
    })
    })
