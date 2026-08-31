import { APIRequestContext } from '@playwright/test';
import { validUser } from '../data/api/users';
import { UserResponse } from '../data/api/users.type';
import { UserRegistrationData,User, GetUserDetailResponse } from '../data/api/users.type';

export class UserApi {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async login(): Promise<UserResponse> {
    const response = await this.request.post('/api/verifyLogin', {
        form: {
            email: validUser.email,
            password: validUser.password
        }
    });
    return await response.json();
    }

    async loginWithoutEmail(): Promise<UserResponse> {
            const response = await this.request.post('/api/verifyLogin', {
        form: {
            password: validUser.password
        }
    });
    return await response.json();
    }

    async verifyLoginWithDelete(): Promise<UserResponse> {
            const response = await this.request.delete('/api/verifyLogin');
    return await response.json();
    }

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

    async deleteAccount(user: User): Promise<UserResponse> {
    const response = await this.request.delete('/api/deleteAccount', {
        form: {
            email: user.email,
            password: user.password
        }
    });
    return await response.json();
    }

    async updateAccount(user: User): Promise<UserResponse> {
    const response = await this.request.put('/api/updateAccount', {
        form: {
            email: user.email,
            password: user.password
        }
    });
    return await response.json();
    }

    async getUserDetailByEmail(email: string): Promise<GetUserDetailResponse> {
    const response = await this.request.get('/api/getUserDetailByEmail', {
        params: {
            email: email
        }
    });
    return await response.json();
    }
}