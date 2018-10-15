const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../models/user');
const server = require('../server');
const should = chai.should();


chai.use(chaiHttp);
const agent = chai.request.agent(server);


describe('Users', () => {
    it('Should be able to get login page GET /login ', (done) => {
        agent
        .get('/login')
        .end((err, res) => {
            if(err) {done(err)}
            res.status.should.be.equal(200)
            res.should.be.html
            done();
        })
    })
    it('Should be able to get signup page GET /signup ', (done) => {
        agent
        .get('/signup')
        .end((err, res) => {
            if(err) {done(err)}
            res.status.should.be.equal(200)
            res.should.be.html
            done();
        })
    })
    it('Should be able signup- Create new User -  POST to /signup', (done) => {
        agent
        .post('/signup')
        .send({username: 'testUser', email:'test@test.com', password: 'testUser'})
        .end((err, res) => {
            if(err) {done(err)}
            res.status.should.be.equal(200)
            res.should.have.cookie('cToken');
            done();
        })
    })
    it('Should be able to login at /login', (done) => {
        agent
            .post('/login')
            .send({username: 'bro', password: 'bro'})
            .end((err, res) => {
                res.status.should.be.equal(200)
                res.should.have.cookie('cToken')
                done();
            })
    })
    it('Should logout a user with /logout ', (done) => {
        agent
        .get('/logout')
            .end((err, res) => {
                res.status.should.be.equal(200)
                res.should.not.have.cookie('cToken')
                done();
            })

    })
})
