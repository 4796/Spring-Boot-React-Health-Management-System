import { Link } from "react-router-dom";
import { AppointmentData } from "../components/AppointmentListing";
import { RegisterArgs } from "../components/forms/RegisterForm";
import Button from "../components/reusable/Button";
import UserListings, { UserType } from "../components/UserListings";
import { RegisterResponse, Role } from "../services/auth";
import { All } from "./All";

export class Admin extends All {
  constructor(id: string, token: string) {
    super(id, token);
  }
  async changeDoctorSalary(
    doctorId: string,
    percentage: number,
    sign: "+" | "-"
  ): Promise<boolean> {
    try {
      const res = await fetch(
        `/api/doctors/${doctorId}/adjust-salary?percentage=${percentage}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
            Sign: sign,
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
  async registerDoctor(args: RegisterArgs): Promise<RegisterResponse | null> {
    try {
      console.log(args);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
      });
      if (res.ok) {
        const data = await res.json();
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
  async getAllUsers(): Promise<UserType[] | null> {
    try {
      const res = await fetch("/api/auth/admin/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
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
  async editUserInfo(args: RegisterArgs): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async getUserInfo(): Promise<RegisterArgs | null> {
    throw new Error("Method not implemented.");
  }
  getHomePage(): React.ReactElement {
    return (
      <>
        <h1 className="text-4xl text-sky-700 font-bold my-4">Users</h1>
        <UserListings />
        <Link to="/register-doctor" className="inline-block mt-4">
          <Button style="GOOD">Register New Doctor</Button>
        </Link>
      </>
    );
  }
  getRole(): Role {
    return "ROLE_ADMIN";
  }
  override async getAppointments(): Promise<AppointmentData[] | null> {
    return [];
  }
}
