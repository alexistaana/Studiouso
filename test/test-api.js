const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const { app, runServer, closeServer } = require('../server');

const expect = chai.expect;

const { User } = require('../users/models');
const { TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);

//USER DATA
function userData(){
    const userData ={
        username: "Malexi",
        password: "password",
        email: "test@gmail.com",
        bmrResults: "0",
        bmiResults: "0",
        tasks: [],
        schedule: []
    }

    User.create(userData)
}


//BREAKS DOWN DATABASE
function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

//START OF TEST FUNCTIONS
describe('user test', function () {

  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function () {
    return userData();
  });

  afterEach(function () {
    return tearDownDb();
  });

  after(function () {
    return closeServer();
  });

  it('should return users', function () {
    return chai.request(app)
      .get('/api/users/get')
      .then(function (res) {
        console.log(res.body);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');

        expect(res.body.length).to.be.at.least(1);
        // each item should be an object with key/value pairs
        const expectedKeys = ['username', 'email', 'id'];
        res.body.forEach(function (item) {
          expect(item).to.be.a('object');
          expect(item).to.include.keys(expectedKeys);
        });
      });
  });

  it('should add a user!', function () {
    const newItem = {
      username: "tester",
      password: "password",
      email: "email@email.com"
    };

    return chai.request(app)
      .post('/api/users')
      .send(newItem)
      .then(function (res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('username', 'email');
        expect(res.body.id).to.not.equal(null);
      });
  });

  it('should update bmr on PUT', function () {
    let updateData;

    User.findOne({"username": "Malexi"})
    .then(user => {
    
        updateData = {
            id: user._id,
            bmrResults: "1500",
        };
        return chai.request(app)
        .put(`/post/bmr`)
        .send(updateData)
        .then(function (res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.body).to.include.keys('username', 'password', 'email');
            expect(res.body.id).to.not.equal(null);
        });
    });
  });
});