export interface UserType {
  _id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  otp: string;
  verified: boolean;
  __v: number;
}

export interface LogInError {
  wrong_credentials: boolean;
}
