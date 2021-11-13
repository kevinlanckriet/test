const request = require('supertest');
const {
    response
} = require('../index');
const app = require('../index');

it('Test the test setup', () => {});

describe('Tests for GET functionalities', () => {
    it('GET /table returns a JSON', () => {
        return request(app)
            .get('/table')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        userid: expect.any(Number)
                    })
                ]))
            });
    });

    it('GET /table/postid returns a specific post', () => {
        return request(app)
            .get('/table/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(expect.objectContaining({
                    id: 1,
                    userid: 1,
                    mood: "good",
                    weather: "rainy"
                }))
            });
    });

    it('GET /posts/userid when invalid id return 404', () => {
        return request(app).get('/posts/invalid').expect(404);
    });
});

describe('Tests for DELETE functionalities', () => {

});

describe('Tests for POST functionalities', () => {

});

describe('Tests for UPDATE functionalities', () => {

});