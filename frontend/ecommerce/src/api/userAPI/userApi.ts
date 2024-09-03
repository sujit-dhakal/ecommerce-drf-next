import { IUserApi } from "./IUserApi";
import { client } from "../baseConfig";
import { loginUser, User } from "@/types/userTypes";

export class UserApi implements IUserApi {
  async registerUser(user: User): Promise<User> {
    const response = await client.post<User>("register/", user);
    return response.data;
  }
  async loginUser(user: loginUser): Promise<loginUser> {
    const response = await client.post<User>("login/", user);
    return response.data;
  }
}
