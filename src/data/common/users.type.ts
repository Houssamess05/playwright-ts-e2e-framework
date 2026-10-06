export interface User {
    email: string;
    password: string;
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
  zipcode: string;
  state: string;
  city: string;
  mobile_number: string;
}