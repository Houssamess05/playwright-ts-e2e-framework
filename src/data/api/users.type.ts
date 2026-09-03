

export interface UserResponse {
    responseCode: number;
    message: string;
}

export type Title = 'Mr' | 'Mrs' | 'Miss';

export interface UserRegistrationData {
  name: string;
  email: string;
  password: string;
  title: Title;
  birth_date: number;
  birth_month: number;
  birth_year: number;
  firstname: string;
  lastname: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  zipcode: number;
  state: string;
  city: string;
  mobile_number: number;
}

export interface UserDetail {
  id: number;
  name: string;
  email: string;
  title: string;
  birth_day: string;
  birth_month: string;
  birth_year: string;
  first_name: string;
  last_name: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
}

export interface GetUserDetailResponse {
  responseCode: number;
  user: UserDetail;
}