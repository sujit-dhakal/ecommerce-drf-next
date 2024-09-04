import { User, loginUser } from "@/types/userTypes";
export interface IUserApi {
  registerUser(user: User): Promise<{ data: User; status: number }>;
  loginUser(user: loginUser): Promise<{ data: loginUser; status: number }>;
}
