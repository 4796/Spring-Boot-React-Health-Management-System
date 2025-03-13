import { JSX } from "react";
import { RegisterResponse, Role } from "../services/auth";
import { All } from "./All";
import AppointmentListings from "../components/AppointmentListings";
import { RegisterArgs } from "../components/forms/RegisterForm";

export class Patient extends All {
  constructor(id: string, username: string, token: string) {
    super(id, username, token);
  }

  async editUserInfo(args: RegisterArgs): Promise<boolean> {
    try {
      const res = await fetch(`/api/patients/${this.id}`, {
        method: "PUT",
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
  async getUserInfo(): Promise<RegisterArgs | null> {
    try {
      const res = await fetch(`/api/patients/${this.id}`, {
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
    return (
      <>
        <h1 className="text-4xl text-sky-700 font-bold my-4">
          Your Appointments
        </h1>
        <AppointmentListings />
      </>
    );
  }
  getRole(): Role {
    return "ROLE_PATIENT";
  }
}
