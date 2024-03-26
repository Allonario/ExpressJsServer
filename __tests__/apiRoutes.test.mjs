import {server} from '../app.js';
import supertest from 'supertest';
import 'jest-extended';
import { LOGIN_DATA } from '../middleware/dataIO';



const request = supertest(server);
describe('API Routes', () => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    test('PUT /api/registration должен создать новый аккаунт,' +
        ' либо вренуть сообщение о том, что такой аккаунт с такой почтой уже существует', async () => {
        let response = await request.put('/api/registration').send({
            name: 'John Doe',
            username: 'john@example.com',
            password: 'password123',
            date: '1990-01-01',
        });
        expect([201, 401]).toContain(response.statusCode);
        if(response.statusCode === 201) {
            expect(response.body.message).toBe('Аккаунт создан успешно');
        } else{
            expect(response.body.message).toBe("Данная почта уже используется");
        }
    });
    test('Удачная попытка авторизации', async () => {
        const validLoginData = {
            username: 'john@example.com',
            password: 'password123',
        };

        const response = await request.post('/api/login').send(validLoginData);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful');
    });

    test('Неудачная попытка авторизации', async () => {
        const invalidLoginData = {
            username: 'invalidUsername',
            password: 'invalidPassword',
        };

        const response = await request.post('/api/login').send(invalidLoginData);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid login credentials');
        expect(response.body.profiles).toEqual(LOGIN_DATA);
    });
});