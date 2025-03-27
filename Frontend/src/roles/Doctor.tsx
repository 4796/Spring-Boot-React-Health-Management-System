import { JSX } from "react";
import { Role } from "../services/auth";
import { All } from "./All";
import { RegisterArgs } from "../components/forms/RegisterForm";
import AppointmentListings from "../components/AppointmentListings";
import { MedicalHistoryType } from "../components/listing/MedicalHistoryListing";
import H1 from "../components/reusable/h/H1";
import SearchPatients from "../components/search/SearchPatients";

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
        //debug console.log(data);
        return true;
      } else {
        //debug console.log(res);

        //debug console.log("Unathorized access.");
        //destroySession();
        return false;
      }
    } catch (error) {
      //debug console.log(error);
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
        //debug console.log(data);
        return true;
      } else {
        //debug console.log(res);

        //debug console.log("Unathorized access.");
        //destroySession();
        return false;
      }
    } catch (error) {
      //debug console.log(error);
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
        //debug console.log(data);
        return data.medicalRecord; // return data
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
        //debug console.log(data);
        return true;
      } else {
        //debug console.log(res);

        //debug console.log("Unathorized access.");
        //destroySession();
        return false;
      }
    } catch (error) {
      //debug console.log(error);
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
  async getPatients(
    name?: string,
    email?: string
  ): Promise<RegisterArgs[] | null> {
    try {
      const res = await fetch(
        `/api/patients/search?${name ? `name=${name}` : ""}${
          name && email ? "&" : ""
        }${email ? `email=${email}` : ""}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
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

  getHomePage(): JSX.Element {
    return (
      <>
        <H1>Search Patients</H1>
        <SearchPatients />
        <H1>Booked Appointments</H1>
        <AppointmentListings />
      </>
    );
  }
  getRole(): Role {
    return "ROLE_DOCTOR";
  }
}
