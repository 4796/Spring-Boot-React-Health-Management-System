import { JSX } from "react";
import { RegisterResponse, Role } from "../services/auth";
import { RegisterArgs } from "../components/forms/RegisterForm";

export abstract class All {
  protected id: string;
  protected username: string;
  protected token: string;
  constructor(id: string, username: string, token: string) {
    this.id = id;
    this.username = username;
    this.token = token;
  }
  // getters

  getId(): string {
    return this.id;
  }
  getUsername(): string {
    return this.username;
  }
  getToken(): string {
    return this.token;
  }
  // async
  abstract getUserInfo(): Promise<RegisterArgs | null>;
  abstract editUserInfo(args: RegisterArgs): Promise<boolean>;
  // abstract getters
  abstract getRole(): Role;
  abstract getHomePage(): JSX.Element;
}
