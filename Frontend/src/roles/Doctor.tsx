import { JSX } from "react";
import { Role } from "../services/auth";
import { All } from "./All";
import { RegisterArgs } from "../components/forms/RegisterForm";

import AppointmentListings from "../components/AppointmentListings";

export class Doctor extends All {
  constructor(id: string, token: string) {
    super(id, token);
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
    return (
      <>
        <h1 className="text-4xl text-sky-700 font-bold my-4">
          Booked Appointments
        </h1>
        <AppointmentListings />
      </>
    );
  }
  getRole(): Role {
    return "ROLE_DOCTOR";
  }
}
