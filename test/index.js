const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('site', () => {
    it('Should have a homepage', (done) => {
        chai.request('localhost:5000')
        .get('/')
        .end((err, res) => {
            if(err) {
                done(err)
            }
            res.status.should.be.equal(200)
            done();
        })
    })
})
