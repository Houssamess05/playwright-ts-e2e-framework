import { test, expect } from '@playwright/test';
import { UserDetailsResponse} from '../../src/data/user.types';

test('Obtener la información del usuario 2', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/2');
    expect(response.status()).toBe(200);
    const body: UserDetailsResponse = await response.json();
    expect(body.data.id).toBe(2);
    expect(body.data.email).toBe('janet.weaver@reqres.in');
    expect(body.data.first_name).toBe('Janet');
    expect(body.data.last_name).toBe('Weaver');
    expect(body.data.avatar).toBe('https://reqres.in/img/faces/2-image.jpg');
});