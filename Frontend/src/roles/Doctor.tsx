import { JSX } from "react";
import { Role } from "../services/auth";
import { All } from "./All";
import { RegisterArgs } from "../components/forms/RegisterForm";

import AppointmentListings from "../components/AppointmentListings";
import { MedicalHistoryType } from "../components/MedicalHistoryListing";

export class Doctor extends All {
  constructor(id: string, token: string) {
    super(id, token);
  }

  async deleteMedicalRecord(id: string): Promise<boolean | null> {
    try {
      const res = await fetch(`/api/medical-records/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        return true;
      } else {
        console.log(res);

        console.log("Unathorized access.");
        //destroySession();
        return false;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async editMedicalRecord(args: MedicalHistoryType): Promise<boolean | null> {
    try {
      const res = await fetch(`/api/medical-records/${args.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        return true;
      } else {
        console.log(res);

        console.log("Unathorized access.");
        //destroySession();
        return false;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getMedicalRecord(id: string): Promise<MedicalHistoryType | null> {
    try {
      const res = await fetch(`/api/medical-records/${id}/with-patient`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        return data.medicalRecord; // return data
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
  async makeMedicalRecord(args: MedicalHistoryType): Promise<boolean | null> {
    try {
      const res = await fetch(`/api/medical-records`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        return true;
      } else {
        console.log(res);

        console.log("Unathorized access.");
        //destroySession();
        return false;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
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
