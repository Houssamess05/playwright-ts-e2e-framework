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