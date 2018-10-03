const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const { app, runServer, closeServer } = require('../server');

// this lets us use *expect* style syntax in our tests
// so we can do things like `expect(1 + 1).to.equal(2);`
// http://chaijs.com/api/bdd/
const expect = chai.expect;

const { User } = require('../users/models');
const { TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);

function userData(){
    console.log('creating user')

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


function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe('user test', function () {

  // Before our tests run, we activate the server. Our `runServer`
  // function returns a promise, and we return the that promise by
  // doing `return runServer`. If we didn't return a promise here,
  // there's a possibility of a race condition where our tests start
  // running before our server has started.
  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function () {
    return userData();
  });

  afterEach(function () {
    return tearDownDb();
  });

  // although we only have one test module at the moment, we'll
  // close our server at the end of these tests. Otherwise,
  // if we add another test module that also has a `before` block
  // that starts our server, it will cause an error because the
  // server would still be running from the previous tests.
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
        // response should be deep equal to `newItem` from above if we assign
        // `id` to it from `res.body.id`
        // expect(res.body).to.deep.equal(Object.assign(newItem, { id: res.body.id }));
      });
  });

  it('should update items on PUT', function () {
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