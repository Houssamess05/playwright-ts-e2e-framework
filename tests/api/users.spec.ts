import { test, expect } from '@playwright/test';
import { UserDetailsResponse, UserPayload, CreateUserResponse} from '../../src/data/api/user.types';
import { reqresUser2 } from '@data/api/users'

test('GET /api/users/2 - Obtener la información del usuario 2', async ({ request }) => {
    const response = await request.get('/api/users/2');
    expect(response.status()).toBe(200);
    const body: UserDetailsResponse = await response.json();
    expect(body.data.id).toBe(reqresUser2.data.id);
    expect(body.data.email).toBe(reqresUser2.data.email);
    expect(body.data.first_name).toBe(reqresUser2.data.first_name);
    expect(body.data.last_name).toBe(reqresUser2.data.last_name);
    expect(body.data.avatar).toBe(reqresUser2.data.avatar);
});

test('POST /api/users - Crear un nuevo usuario', async ({ request }) => {
    const payload: UserPayload = {
        name: 'John Doe',
        job: 'Software Engineer'
    };
    const response = await request.post('/api/users', {
        data: payload
    });
    expect(response.status()).toBe(201);
    const body: CreateUserResponse = await response.json();
    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);
});

test('PUT /api/users/2 - Actualizar la información del usuario 2', async ({ request }) => {
    const payload: UserPayload = {
        name: 'Jane Doe',
        job: 'Product Manager'
    };
    const response = await request.put('/api/users/2', {
        data: payload
    });
    expect(response.status()).toBe(200);
    const body: CreateUserResponse = await response.json();
    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);
});

test('DELETE /api/users/2 - Eliminar el usuario 2', async ({ request }) => {
    const response = await request.delete('/api/users/2');
    expect(response.status()).toBe(204);
});