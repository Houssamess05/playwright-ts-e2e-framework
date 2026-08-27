import { test, expect } from '@playwright/test';
import { UserDetailsResponse, UserPayload, CreateUserResponse} from '../../src/data/user.types';
import { request } from 'https';

test('GET /api/users/2 - Obtener la información del usuario 2', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/2');
    expect(response.status()).toBe(200);
    const body: UserDetailsResponse = await response.json();
    expect(body.data.id).toBe(2);
    expect(body.data.email).toBe('janet.weaver@reqres.in');
    expect(body.data.first_name).toBe('Janet');
    expect(body.data.last_name).toBe('Weaver');
    expect(body.data.avatar).toBe('https://reqres.in/img/faces/2-image.jpg');
});

test('POST /api/users - Crear un nuevo usuario', async ({ request }) => {
    const payload: UserPayload = {
        name: 'John Doe',
        job: 'Software Engineer'
    };
    const response = await request.post('https://reqres.in/api/users', {
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
    const response = await request.put('https://reqres.in/api/users/2', {
        data: payload
    });
    expect(response.status()).toBe(200);
    const body: CreateUserResponse = await response.json();
    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);
});

test('DELETE /api/users/2 - Eliminar el usuario 2', async ({ request }) => {
    const response = await request.delete('https://reqres.in/api/users/2');
    expect(response.status()).toBe(204);
});