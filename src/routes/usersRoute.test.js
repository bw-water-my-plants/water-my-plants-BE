const request = require('supertest');
const server = require('../server');
const createToken = require('../middleware/generateTokenMiddleware');
const Users = require('../database/helpers/users');

afterEach(async () => {
    await Users.truncate();
});

beforeEach(async () => {
    await Users.truncate();
});

const testUser = {
    username: 'username',
    password: 'password',
    phone_number: '00000000',
    email: 'email@email.com'
};

const createUser = async () => {
    await request(server)
        .post('/api/auth/register')
        .send(testUser);
};

const loginUser = async () => {
    const res = await request(server)
        .post('/api/auth/login')
        .send(testUser);
    const token = res.body.token;
    return token;
};

describe('USERS route', () => {
    describe('GET route', () => {
        it('should return status 200 on request if token in header', async () => {
            await createUser();
            const token = await loginUser();
            const res = await request(server)
                .get('/api/profile')
                .set('authorization', token);
            expect(res.status).toEqual(200);
        });
        it('should return user object if token in header', async () => {
            await createUser();
            const token = await loginUser();
            const res = await request(server)
                .get('/api/profile')
                .set('authorization', token);
            expect(res.body.username).toEqual('username');
            expect(res.body.phone_number).toEqual('00000000');
            expect(res.body.email).toEqual('email@email.com');
        });
        it('should return status 401 on request if no token', async () => {
            await createUser();
            await loginUser();
            const res = await request(server).get('/api/profile');
            expect(res.status).toEqual(401);
        });
        it('should return error message if no token', async () => {
            await createUser();
            await loginUser();
            const res = await request(server).get('/api/profile');
            expect(res.body).toEqual({ message: 'No token provided!' });
        });
    });
});
