import { User } from "../typings";

export interface SigninResponse {
    user: User;
    token: string;
}