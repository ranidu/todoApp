import ExpressConfig from '../../config/ExpressConfig';
import todoController from '../todoController';
import request from 'supertest';

const app = ExpressConfig.app();

app.get('/api/todo', todoController.getAll)

describe('Todo Controller', () => {
    test('GET /api/todo/', async done => {
        let response = await request(app)
            .get('/api/todo')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8');
        console.log(response);    
    })
})
