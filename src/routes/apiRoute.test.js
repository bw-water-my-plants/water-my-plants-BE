// const request = require('supertest');
// const server = require('../server');

describe('API route', () => {
    it('should return 200 on success', async done => {
        const res = await request(server).get('/api');
        expect(res.status).toEqual(200);
        done();
    });
});
