import { JSX } from "react";
import { Role } from "../services/auth";
import { RegisterArgs } from "../components/forms/RegisterForm";
import { LoginArgs } from "../components/forms/LoginForm";

export abstract class All {
  protected id: string;

  protected token: string;
  constructor(id: string, token: string) {
    this.id = id;

    this.token = token;
  }
  // getters

  getId(): string {
    return this.id;
  }

  getToken(): string {
    return this.token;
  }
  // async
  abstract getUserInfo(): Promise<RegisterArgs | null>;
  abstract editUserInfo(args: RegisterArgs): Promise<boolean>;
  async editUserCredentials(args: LoginArgs): Promise<boolean> {
    try {
      const res = await fetch(`/api/auth/admin/users/${this.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(args),
      });
      if (res.ok) {
        return true;
      } else {
        console.log(res);
        console.log("Unathorized access.");

        //destroySession();
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  // abstract getters
  abstract getRole(): Role;
  abstract getHomePage(): JSX.Element;
}
