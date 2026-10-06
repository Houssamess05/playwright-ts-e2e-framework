import { UserDetail, GetUserDetailResponse } from './users.type';


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
