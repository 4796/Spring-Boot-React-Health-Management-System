import { LoginArgs } from "../components/forms/LoginForm";
import { RegisterArgs } from "../components/forms/RegisterForm";
export type Role = "ROLE_ADMIN" | "ROLE_PATIENT" | "ROLE_DOCTOR";
export const roles: Role[] = ["ROLE_ADMIN", "ROLE_PATIENT", "ROLE_DOCTOR"];
export type LoginResponse = {
  id: number;
  message: string;
  role: Role;
  status: string;
  token: string;
};
export const login = async (args: LoginArgs): Promise<LoginResponse | null> => {
  try {
    const res = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });

    if (!res.ok) {
      if (res.status === 401) {
        console.error(res.statusText);
        return await res.json();
      }
      return null;
    }

    const data = await res.json();
    // console.log(data);

    return data;
  } catch (error) {
    console.log("Login error:", error);
    return null;
  }
};

export type RegisterResponse = {
  userId: number;
  message: string;
  status: string;
};
export const register = async (
  args: RegisterArgs
): Promise<RegisterResponse | null> => {
  try {
    const res = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });

    if (!res.ok) {
      if (res.status >= 400 && res.status < 500) {
        console.error(res.statusText);
        return await res.json();
      }
      return null;
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Register error:", error);
    return null;
  }
};
