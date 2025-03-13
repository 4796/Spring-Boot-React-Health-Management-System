import { RegisterArgs } from "../components/forms/RegisterForm";
import { RegisterResponse, Role } from "../services/auth";
import { All } from "./All";

export class Admin extends All {
  constructor(id: string, username: string, token: string) {
    super(id, username, token);
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
}
