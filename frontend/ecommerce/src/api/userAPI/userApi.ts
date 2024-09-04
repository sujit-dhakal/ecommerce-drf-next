import { IUserApi } from "./IUserApi";
import { client } from "../baseConfig";
import { loginUser, User } from "@/types/userTypes";

export class UserApi implements IUserApi {
  async registerUser(user: User): Promise<{ data: User; status: number }> {
    const response = await client.post<User>("register/", user);
    return {
      data: response.data,
      status: response.status,
    };
  }
  async loginUser(
    user: loginUser
  ): Promise<{ data: loginUser; status: number }> {
    const response = await client.post<loginUser>("login/", user);
    return {
      data: response.data,
      status: response.status,
    };
  }
  async logOut(token: string) {
    const response = await client.post("logout/", {
      refresh: token,
    });
    return {
      data: response.data,
      status: response.status,
    };
  }
}
