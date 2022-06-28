import app from '../app.js';
import mongoose from 'mongoose';
import supertest, * as request from 'supertest';
import User from '../models/user.js';

// Constants
const EXISTING_USER_MOCK_DATA = {
  userRegistrationData: {
    _id: '62acfbc97060b32085d9955c',
    username: 'Swilson',
    password: 'Shadow45!',
    email: 'mwilson@example.com',
    first_name: 'Matt',
    last_name: 'Wilson',
    DOB: '09/02/1991',
  },
};
const NON_EXISTING_USER_MOCK_DATA = {
  userRegistrationData: {
    username: 'TEST',
    password: 'test',
    email: 'test@test.com',
    first_name: 'test',
    last_name: 'test',
    DOB: '09/02/1991',
  },
};

afterAll(() => {
  mongoose.connection.close();
});

//! ===USER ROUTE TESTS===

// Get index of all users
describe('GET to /user gets index of all users', () => {
  //
  it('Responds with status code 200', async () => {
    const response = await supertest(app).get('/user');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('Response.body contains type Array', async () => {
    const response = await supertest(app).get('/user');
    expect(response.body).toBeInstanceOf(Array);
  });

  it('Returns a user array that is not empty', async () => {
    const response = await supertest(app).get('/user');
    expect(response.body.length).toBeGreaterThan(0);
  });
});

// Get singe user via ID
describe('GET to /user/id gets single user', () => {
  //
  const userId = '62acfbc97060b32085d9955c';

  it('Responds with status code 200', async () => {
    const response = await supertest(app).get(`/user/${userId}`);
    expect(response.statusCode).toBe(200);
  });

  it('Response.body contains type Object', async () => {
    const response = await supertest(app).get(`/user/${userId}`);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('Response.body.username to be truthy', async () => {
    const response = await supertest(app).get(`/user/${userId}`);
    expect(response.body.username).toBeTruthy();
  });
});

// Create user
describe('POST to /user creates new user', () => {
  //
  it('Returns 404 if user already exists', (done) => {
    supertest(app)
      .post('/user')
      .send(EXISTING_USER_MOCK_DATA)
      .set('Accept', 'application/json')
      .expect(400)
      .expect(correctMessage)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });

    function correctMessage(res) {
      const errorMessage = JSON.parse(res.error.text).message;
      if (errorMessage !== 'Username already exists') {
        throw new Error(
          `Incorrect error message. Got: ${errorMessage}. Expected: Username already exists`
        );
      }
    }
  });

  it('Returns 200 if username does not exist', (done) => {
    supertest(app)
      .post('/user')
      .send(NON_EXISTING_USER_MOCK_DATA)
      .set('Accept', 'application/json')
      .expect(200)

      // Handle error and clean up
      .end(async function (err, res) {
        if (err) return done(err);

        // Get username from response for cleanup
        const username = JSON.parse(res.text).user.username;

        // find created test user
        const testUser = await User.findOne({ username: username });

        // delete created test user
        await User.findByIdAndDelete(testUser._id);

        return done();
      });
  });
});

describe('PUT to /user updates user', () => {
  it('Returns 200 if username is updated appropriately', () => {
    //
    const userId = EXISTING_USER_MOCK_DATA.userRegistrationData._id;

    supertest(app).put(`/user/${userId}`).send(userId).expect(200);
  });
});
