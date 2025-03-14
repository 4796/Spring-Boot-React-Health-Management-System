import { AppointmentData } from "../components/AppointmentListing";
import { RegisterArgs } from "../components/forms/RegisterForm";
import { Role } from "../services/auth";
import { All } from "./All";

export class Admin extends All {
  constructor(id: string, token: string) {
    super(id, token);
  }

  async editUserInfo(args: RegisterArgs): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async getUserInfo(): Promise<RegisterArgs | null> {
    throw new Error("Method not implemented.");
  }
  getHomePage(): React.ReactElement {
    return <div>Admin Dashboard.</div>;
  }
  getRole(): Role {
    return "ROLE_ADMIN";
  }
  override async getAppointments(): Promise<AppointmentData[] | null> {
    return [];
  }
}
