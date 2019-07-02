const request = require('supertest');
const server = require('../server');
const Users = require('../database/helpers/users');

const testUser = {
    username: 'username',
    password: 'password',
    phone_number: '00000000',
    email: 'emai@email.com'
};

const testUserNoEmail = {
    username: 'username',
    password: 'password',
    phone_number: '00000000'
};

afterEach(async () => {
    await Users.truncate();
});

beforeEach(async () => {
    await Users.truncate();
});

async function createUser() {
    await request(server)
        .post('/api/auth/register')
        .send(testUser);
}

describe('AUTH route', () => {
    describe('POST route to LOGIN', () => {
        it('should return 200 on success', async () => {
            await createUser();
            const res = await request(server)
                .post('/api/auth/login')
                .send(testUser);
            expect(res.status).toEqual(200);
        });

        it('should return token on success', async () => {
            await createUser();
            const res = await request(server)
                .post('/api/auth/login')
                .send(testUser);
            expect(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(res.body.token)).toBe(true);
        });
        it('should return 404 on fail', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send(testUser);
            expect(res.status).toEqual(404);
        });

        it('should return error on fail', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send(testUser);
            expect(res.body).toEqual({ error: 'Incorrect credentials' });
        });
    });
    describe('POST route to REGISTER', () => {
        it('should return 200 on success', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send(testUser);
            expect(res.status).toEqual(201);
        });

        it('should return success message on success', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send(testUser);
            expect(res.body).toEqual({ message: 'Successfully registered!' });
        });

        it('should return 500 if the email/phone has already been used', async () => {
            await createUser();
            const res = await request(server)
                .post('/api/auth/register')
                .send(testUser);
            expect(res.status).toEqual(500);
        });

        it('should return error message if the email/phone has already been used', async () => {
            await createUser();
            const res = await request(server)
                .post('/api/auth/register')
                .send(testUser);
            expect(res.body).toEqual({ error: 'Email already registered' });
        });

        it('should return 400 if the email/phone/password is missing', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send(testUserNoEmail);
            expect(res.status).toEqual(400);
        });

        it('should return error message if the email/phone/password is missing', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send(testUserNoEmail);
            expect(res.body).toEqual({ error: "Can't register user. Some information are missing" });
        });
    });
});
