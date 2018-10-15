const chai = require('chai');
const chaiHttp = require('chai-http');
const Comment = require('../models/comment');
const User = require('../models/user')
const server = require('../server.js');
const should = chai.should();
chai.use(chaiHttp);

var agent = chai.request.agent(server);

describe('Comments', () => {
    it('should display comments on show page ', (done) => {
        agent
        .get('/posts/5bbfc9116be2c3495769a59d')
        .end((err, res) => {
            if(err) {done(err)}
            res.status.should.be.equal(200)
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
    it('Should be able to POST new comment to /posts/:postId/comments', (done) => {
        agent
        .post('/posts/5bbfc9116be2c3495769a59d/comments')
        .send({content: 'This is for testing '})
        .end((err, res) => {
            if(err) {done(err)}
            res.status.should.be.equal(200)
            res.should.be.html
            done();
        })
    })

})
