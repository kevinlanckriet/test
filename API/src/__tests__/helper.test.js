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
});

describe('Tests for DELETE functionalities', () => {
    it('DELETE /table/postid removes given postId object', () => {
        return request(app)
            .delete('/table/1')
            .expect(200)
    })
});

describe('Tests for POST functionalities', () => {

});

describe('Tests for UPDATE functionalities', () => {
    it('PUT /table/postid updates given postId object', () => {
    var postEdit = {id: 1,userid: 1,mood: "bad",weather: "rainy"}
    return request(app)
        .put('/table/1')
        .send(postEdit)
        .expect(200)
    })
});