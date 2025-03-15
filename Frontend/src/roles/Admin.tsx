import { AppointmentData } from "../components/AppointmentListing";
import { RegisterArgs } from "../components/forms/RegisterForm";
import UserListings, { UserType } from "../components/UserListings";
import { Role } from "../services/auth";
import { All } from "./All";

export class Admin extends All {
  constructor(id: string, token: string) {
    super(id, token);
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
