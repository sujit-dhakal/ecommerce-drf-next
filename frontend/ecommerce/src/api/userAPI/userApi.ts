import { IUserApi } from "./IUserApi";
import { client } from "../baseConfig";
import { loginUserType, User } from "@/types/userTypes";

export class UserApi implements IUserApi {
  async userProfile(): Promise<User> {
    const response = await client.get("user-profile");
    return response.data;
  }
  async checkUserName(name: string) {
    const response = await client.get(`check-username/${name}/`);
    return {
      data: response.data,
    };
  }
  async logout(token: string) {
    const response = await client.post("logout/", {
      refresh: token,
    });
    return {
      data: response.data,
      status: response.status,
    };
  }
  async registerUser(user: User): Promise<{ data: User; status: number }> {
    const response = await client.post<User>("register/", user);
    return {
      data: response.data,
      status: response.status,
    };
  }
  async loginUser(
    user: loginUserType
  ): Promise<{ data: loginUserType; status: number }> {
    const response = await client.post<loginUserType>("login/", user);
    return {
      data: response.data,
      status: response.status,
    };
  }
  async checkEmail(email: string) {
    const response = await client.get(`check-email/${email}/`);
    return {
      data: response.data,
    };
  }
}
