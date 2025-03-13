import { JSX } from "react";
import { Role } from "../services/auth";
import { All } from "./All";
import { RegisterArgs } from "../components/forms/RegisterForm";

export class Doctor extends All {
  constructor(id: string, username: string, token: string) {
    super(id, username, token);
  }

  async editUserInfo(args: RegisterArgs): Promise<boolean> {
    try {
      const res = await fetch(
        `/api/doctors/me/update-phone?phoneNumber=${args.phoneNumber}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
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
  async getUserInfo(): Promise<RegisterArgs | null> {
    try {
      const res = await fetch(`/api/doctors/${this.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        return data;
      } else {
        console.log(res);

        console.log("Unathorized access.");
        //destroySession();
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  getHomePage(): JSX.Element {
    return <>Doctor Dashboard.</>;
  }
  public getRole(): Role {
    return "ROLE_DOCTOR";
  }
}
