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
/*
describe('Tests for DELETE functionalities', () => {
    it('DELETE /table/postid removes given postId object', () => {
        return request(app)
            .delete('/table/1')
            .expect(200)
    })
});
*/
describe('Tests for POST functionalities', () => {
    it('POST /createpost creates a specific post and returns it', async () => {
        const data = {
            userid: 1,
            mood: "good",
            weather: "codey"
        }
        await request(app)
            .post("/createpost")
            .send(data)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.userid).toBe(data.userid)
                expect(response.body.mood).toBe(data.mood)
                expect(response.body.weather).toBe(data.weather)
            })
    })
});

describe('Tests for UPDATE functionalities', () => {
    it('PUT /table/postid updates given postId object', () => {
    var postEdit = {id: 2,userid: 1,mood: "dreamy",weather: "rainy"}
    return request(app)
        .put('/table/2')
        .send(postEdit)
        .expect(200)
    })
});