export interface UserData {
  password: string;
  day: string;
  month: string;
  year: string;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

// Api response types
export interface UserPayload {
  name: string;
  job: string;
}

export interface CreateUserResponse extends UserPayload {
  id: string;
  createdAt: string;
}

export interface UserDetailsResponse {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
}
