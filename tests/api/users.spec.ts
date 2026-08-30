import { test, expect } from '@playwright/test';
import { LoginApi } from '../../src/api/UserApi';
import { getRegistrationUser, expectedValidUserDetail, validUser } from '../../src/data/api/users';
import { User } from '../../src/data/api/users.type';

/// Test para verificar que el login funciona correctamente
/// enviando credenciales válidas
test('POST /api/verifyLogin - Verify login with valid credentials', async ({ request }) => {
    const loginApi = new LoginApi(request);
    const response = await loginApi.login();
    expect(response.responseCode).toBe(200);
    expect(response.message).toBe('User exists!');
});

/// Test para verificar que el login funciona correctamente
/// enviando credenciales válidas
test('POST /api/verifyLogin - Verify login withOUT email', async ({ request }) => {
    const loginApi = new LoginApi(request);
    const response = await loginApi.loginWithoutEmail();
    expect(response.responseCode).toBe(400);
    expect(response.message).toBe('Bad request, email or password parameter is missing in POST request.');
});

test('DELETE /api/verifyLogin - Verify login endpoint does not support DELETE', async ({ request }) => {
    const loginApi = new LoginApi(request);
    const response = await loginApi.verifyLoginWithDelete();
    expect(response.responseCode).toBe(405);
    expect(response.message).toBe('This request method is not supported.');
});


test('POST /api/createAccount - Create user account', async ({ request }) => {
    const loginApi = new LoginApi(request);
    const response = await loginApi.createAccount(getRegistrationUser());
    expect(response.responseCode).toBe(201);
    expect(response.message).toBe('User created!');
});


test('DELETE /api/deleteAccount - Delete user account', async ({ request }) => {
    const loginApi = new LoginApi(request);
    // Creamos el usuario que vamos a eliminar.
    const user = getRegistrationUser();
    const userResponse = await loginApi.createAccount(user);
    expect(userResponse.responseCode).toBe(201);
    const userToDelete : User = {
        email: user.email,
        password: user.password
    };
    // Eliminamos el usuario.
    const response = await loginApi.deleteAccount(userToDelete);
    expect(response.responseCode).toBe(200);
    expect(response.message).toBe('Account deleted!');
});

test('PUT /api/updateAccount - Update user account', async ({ request }) => {
    const loginApi = new LoginApi(request);
    // Creamos el usuario que vamos a actualizar.
    const user = getRegistrationUser();
    const userResponse = await loginApi.createAccount(user);
    expect(userResponse.responseCode).toBe(201);
    const userToUpdate : User = {
        email: user.email,
        password: user.password
    };
    // Actualizamos el usuario.
    const response = await loginApi.updateAccount(userToUpdate);
    expect(response.responseCode).toBe(200);
    expect(response.message).toBe('User updated!');
});

test('GET /api/getUserDetailByEmail - Get user account details by email', async ({ request }) => {
    const loginApi = new LoginApi(request);

    // Hacemos la llamada usando la propiedad email de validUser
    const response = await loginApi.getUserDetailByEmail(validUser.email);

    expect(response.responseCode).toBe(200);
    // Validamos el objeto completo devuelto contra el objeto esperado
    expect(response.user).toEqual(expectedValidUserDetail);
});