import { test, expect } from '@playwright/test';
import { UserApi } from '../../src/api/UserApi';
import { getRegistrationUser, expectedValidUserDetail, validUser } from '../../src/data/api/users';
import { User } from '../../src/data/api/users.type';

/// Test to verify that login works correctly
/// by sending valid credentials
test('POST /api/verifyLogin - Verify login with valid credentials', async ({ request }) => {
    const loginApi = new UserApi(request);
    const response = await loginApi.login();
    expect(response.responseCode).toBe(200);
    expect(response.message).toBe('User exists!');
});

/// Test to verify that login works correctly
/// by sending valid credentials without an email
test('POST /api/verifyLogin - Verify login withOUT email', async ({ request }) => {
    const loginApi = new UserApi(request);
    const response = await loginApi.loginWithoutEmail();
    expect(response.responseCode).toBe(400);
    expect(response.message).toBe('Bad request, email or password parameter is missing in POST request.');
});

test('DELETE /api/verifyLogin - Verify login endpoint does not support DELETE', async ({ request }) => {
    const loginApi = new UserApi(request);
    const response = await loginApi.verifyLoginWithDelete();
    expect(response.responseCode).toBe(405);
    expect(response.message).toBe('This request method is not supported.');
});


test('POST /api/createAccount - Create user account', async ({ request }) => {
    const loginApi = new UserApi(request);
    const response = await loginApi.createAccount(getRegistrationUser());
    expect(response.responseCode).toBe(201);
    expect(response.message).toBe('User created!');
});


test('DELETE /api/deleteAccount - Delete user account', async ({ request }) => {
    const loginApi = new UserApi(request);
    // Create the user we are going to delete.
    const user = getRegistrationUser();
    const userResponse = await loginApi.createAccount(user);
    expect(userResponse.responseCode).toBe(201);
    const userToDelete : User = {
        email: user.email,
        password: user.password
    };
    // Delete the user.
    const response = await loginApi.deleteAccount(userToDelete);
    expect(response.responseCode).toBe(200);
    expect(response.message).toBe('Account deleted!');
});

test('PUT /api/updateAccount - Update user account', async ({ request }) => {
    const loginApi = new UserApi(request);
    // Create the user we are going to update.
    const user = getRegistrationUser();
    const userResponse = await loginApi.createAccount(user);
    expect(userResponse.responseCode).toBe(201);
    const userToUpdate : User = {
        email: user.email,
        password: user.password
    };
    // Update the user.
    const response = await loginApi.updateAccount(userToUpdate);
    expect(response.responseCode).toBe(200);
    expect(response.message).toBe('User updated!');
});

test('GET /api/getUserDetailByEmail - Get user account details by email', async ({ request }) => {
    const loginApi = new UserApi(request);

    // Make the request using the email property from validUser
    const response = await loginApi.getUserDetailByEmail(validUser.email);

    expect(response.responseCode).toBe(200);
    // Validate the full object returned against the expected object
    expect(response.user).toEqual(expectedValidUserDetail);
});