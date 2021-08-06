import { IUser } from "types";

export interface initialState extends IUser {
}

export interface SignInProps {
    email: string;
    password: string;
    rememberMe: boolean;
  }
  
export interface SignUpProps {
    email: string;
    password: string;
  }
  
  export interface ResetPasswordProps {
    email: string;
  }