import { APIRequestContext } from '@playwright/test';
import { validUser } from '../data/api/users';
import { UserResponse } from '../data/api/users.type';
import { UserRegistrationData,User, GetUserDetailResponse } from '../data/api/users.type';

export class UserApi {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    /**
     * Logs in a user with valid credentials and returns the response from the API.
     * @returns The response from the API.
     */
    async login(): Promise<UserResponse> {
    const response = await this.request.post('/api/verifyLogin', {
        form: {
            email: validUser.email,
            password: validUser.password
        }
    });
    return await response.json();
    }

    /**
     * Logs in a user without providing an email, which is expected to result in a 400 Bad Request response.
     * @returns The response from the API.
     */
    async loginWithoutEmail(): Promise<UserResponse> {
            const response = await this.request.post('/api/verifyLogin', {
        form: {
            password: validUser.password
        }
    });
    return await response.json();
    }

    /**
     * Attempts to send a DELETE request to the login endpoint, which is expected to result in a 405 Method Not Allowed response.
     * @returns The response from the API.
     */
    async verifyLoginWithDelete(): Promise<UserResponse> {
            const response = await this.request.delete('/api/verifyLogin');
    return await response.json();
    }

    /**
     * Creates a new user account with the provided registration data and returns the response from the API.
     * @param newUser The registration data for the new user account.
     * @returns The response from the API.
     */
    async createAccount(newUser: UserRegistrationData): Promise<UserResponse> {
    const response = await this.request.post('/api/createAccount', {
        form: {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            title: newUser.title,
            birth_date: newUser.birth_date,
            birth_month: newUser.birth_month,
            birth_year: newUser.birth_year,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            company: newUser.company,
            address1: newUser.address1,
            address2: newUser.address2,
            country: newUser.country,
            zipcode: newUser.zipcode,
            state: newUser.state,
            city: newUser.city,
            mobile_number: newUser.mobile_number
        }
    });
    return response.json();
    }

    /**
     * Deletes a user account with the provided email and password, and returns 200 and the message "Account deleted!" if the deletion is successful.
     * @param user The user credentials used to delete the account.
     * @returns The response from the API.
     */
    async deleteAccount(user: User): Promise<UserResponse> {
    const response = await this.request.delete('/api/deleteAccount', {
        form: {
            email: user.email,
            password: user.password
        }
    });
    return await response.json();
    }

    /**
     * Updates a user account with the provided email and password, and returns the response from the API.
     * @param user The user credentials used to update the account.
     * @returns The response from the API.
     */
    async updateAccount(user: User): Promise<UserResponse> {
    const response = await this.request.put('/api/updateAccount', {
        form: {
            email: user.email,
            password: user.password
        }
    });
    return await response.json();
    }

    /**
     * Retrieves the details of a user by their email address and returns the response from the API.
     * @param email The email address of the user whose details are requested.
     * @returns The response from the API.
     */
    async getUserDetailByEmail(email: string): Promise<GetUserDetailResponse> {
    const response = await this.request.get('/api/getUserDetailByEmail', {
        params: {
            email: email
        }
    });
    return await response.json();
    }
}