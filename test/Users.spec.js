/* eslint-disable no-undef */

const chai = require('chai');
const chaiHttp =  require('chai-http');
const app = require('../server');

// Configure chai
chai.use(chaiHttp);
chai.should();
const expect = chai.expect


describe('Users', () => {
  describe('POST api/v1/auth/signup/', () => {
    // Test to register a user
    it('should create a user account', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup/')
        .set('Content-Type', 'application/json')
        .send({
            first_name: "Richard",
            last_name: "Cypher",
            email: "mustaphee4516@gmail.com",
            phone_number: "08162532000",
            password: "admin123",
            is_agent: false
        });
        console.log(res)
      expect(res.status).to.equal(201);
      // eslint-disable-next-line no-unused-expressions
      expect(res.body).should.have.property('status');
      expect(res.body.data).should.be.an('object');
      expect(res.body.status).to.equal('success');
      expect(res.body.data.is_agent).to.equal(false);
      expect(res.body.data.email).to.equal('mustaphee4516@gmail.com');
      expect(res.body.data).not.to.have.property('password');
    });
  });

  describe('POST api/v1/auth/signup/', () => {
    // Test to register an agent
    it('should create an agent account', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup/')
        .set('Content-Type', 'application/json')
        .send({
            first_name: "James",
            last_name: "Bond",
            email: "muse420@gmail.com",
            phone_number: "08042532999",
            password: "admin123",
            is_agent: true
        });
        console.log(res)
      expect(res.status).to.equal(201);
      // eslint-disable-next-line no-unused-expressions
      expect(res.body).should.have.property('status');
      expect(res.body.data).should.be.an('object');
      expect(res.body.status).to.equal('success');
      expect(res.body.data.is_agent).to.equal(true);
      expect(res.body.data.email).to.equal('muse420@gmail.com');
      expect(res.body.data).not.to.have.property('password');
    });
  });
  describe('POST api/v1/auth/signup', () => {
    // Test to fail at registering user
    it('should not create a user account', async () => {
      const res2 = await chai.request(app)
        .post('/api/v1/auth/signup/')
        .set('Content-Type', 'application/json')
        .send({
          first_name: 'Rita',
          last_name: 'Achebe',
          email: '',
          password: 'adadsd',
        });
      expect(res2.status).to.equal(422);
      // eslint-disable-next-line no-unused-expressions
      expect(res2.body).should.be.an('object');
      expect(res2.body).should.have.property('status');
      expect(res2.body.status).to.equal('fail');
      expect(res2.body).not.to.have.property('data');
    });
  });

  describe('POST api/v1/auth/signup', () => {
    // Test to check user already exists
    // I will test using the default admin email
    it('should not create a user account', async () => {
      const res3 = await chai.request(app)
        .post('/api/v1/auth/signup/')
        .set('Content-Type', 'application/json')
        .send({
          first_name: 'Rita',
          last_name: 'Achebe',
          email: 'officialwebdev@gmail.com',
          phone_number: "08162532809",
          password: 'adadsd',
        });
      expect(res3.status).to.equal(400);
      // eslint-disable-next-line no-unused-expressions
      expect(res3.body).should.be.an('object');
      expect(res3.body).should.have.property('status');
      expect(res3.body.status).to.equal('fail');
      expect(res3.body).not.to.have.property('data');
    });
  });

});
