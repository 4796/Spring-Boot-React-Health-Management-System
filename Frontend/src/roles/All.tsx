import { JSX } from "react";
import { Role } from "../services/auth";
import { RegisterArgs } from "../components/forms/RegisterForm";
import { LoginArgs } from "../components/forms/LoginForm";
import { AppointmentData } from "../components/listing/AppointmentListing";
import { MedicalHistoryType } from "../components/listing/MedicalHistoryListing";

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
        //debug console.log(res);
        //debug console.log("Unathorized access.");

        //destroySession();
        return false;
      }
    } catch (error) {
      //debug console.log(error);
      return false;
    }
  }
  // abstract getters
  abstract getRole(): Role;
  // jsx
  abstract getHomePage(): JSX.Element;

  async getAppointmentSuggestions(
    doctorId: string,
    date: string
  ): Promise<string[] | null> {
    try {
      const res = await fetch(`/api/appointments/suggestions/${doctorId}`, {
        method: "GET",
        headers: {
          datum: date,
          Authorization: `Bearer ${this.token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        //debug console.log(data);
        return data;
      } else {
        //debug console.log(res);
        //debug console.log("Unathorized access.");

        //destroySession();
        return null;
      }
    } catch (error) {
      //debug console.log(error);
      return null;
    }
  }

  async bookAppointment(args: AppointmentData): Promise<boolean> {
    //debug console.log(args);
    try {
      const res = await fetch(`/api/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(args),
      });
      if (res.ok) {
        return true;
      } else {
        //debug console.log(res);
        //debug console.log("Unathorized access.");

        //destroySession();
        return false;
      }
    } catch (error) {
      //debug console.log(error);
      return false;
    }
  }
  async cancelAppointment(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      const role = this.getRole() === "ROLE_PATIENT" ? "patient" : "doctor";
      res.headers.append(role, this.id);
      if (res.ok) {
        // const data = await res.json();

        return true;
      } else {
        //debug console.log(res);

        //debug console.log("Unathorized access.");
        //destroySession();
        return false;
      }
    } catch (error) {
      //debug console.log(error);
      return false;
    }
  }
  async getAppointments(): Promise<AppointmentData[] | null> {
    try {
      const res = await fetch("/api/appointments", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();

        return data;
      } else {
        //debug console.log(res);

        //debug console.log("Unathorized access.");
        //destroySession();
        return null;
      }
    } catch (error) {
      //debug console.log(error);
      return null;
    }
  }

  async getMedicalRecords(): Promise<MedicalHistoryType[] | null> {
    try {
      const res = await fetch("/api/medical-records", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          Patient: this.id,
        },
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        //debug console.log(res);

        //debug console.log("Unathorized access.");
        //destroySession();
        return null;
      }
    } catch (error) {
      //debug console.log(error);
      return null;
    }
  }
}
