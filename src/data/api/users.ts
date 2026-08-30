import { User, UserRegistrationData, UserDetail, GetUserDetailResponse } from './users.type';
import { getUniqueAlphaString } from '../../utils/generators';

export const validUser: User = {
    email: 'houssam@gmail.com',
    password: '1234'
};

export const expectedValidUserDetail: UserDetail = {
    id: 2661347,
    name: 'houssam',
    email: 'houssam@gmail.com',
    title: '',
    birth_day: '22',
    birth_month: '9',
    birth_year: '2005',
    first_name: 'houssa',
    last_name: 'dasdas',
    company: 'dasdas',
    address1: 'dasd ad 2 das',
    address2: '',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001'
};

export const expectedValidUserResponse: GetUserDetailResponse = {
    responseCode: 200,
    user: expectedValidUserDetail
};

export function getRegistrationUser(): UserRegistrationData {
    return {
        name: getUniqueAlphaString(),
        email: `${getUniqueAlphaString()}@gmail.com`,
        password: '1234',
        title: 'Mr',
        birth_date: 15,
        birth_month: 6,
        birth_year: 1990,
        firstname: 'John',
        lastname: 'Doe',
        company: 'Example Inc.',
        address1: '123 Main St',
        address2: 'Apt 4B',
        country: 'United States',
        zipcode: 90001,
        state: 'California',
        city: 'Los Angeles',
        mobile_number: 1234567890,
    };
}