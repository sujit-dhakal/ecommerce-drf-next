import { User, loginUser } from "@/types/userTypes";
export interface IUserApi {
  registerUser(user: User): Promise<User>;
  loginUser(user: loginUser): Promise<loginUser>;
}
