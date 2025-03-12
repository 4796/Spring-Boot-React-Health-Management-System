import { AppointmentData } from "../components/AppointmentListing";

import { RegisterArgs } from "../components/RegisterForm";
import { RegisterResponse } from "./auth";
import { destroySession } from "./session";

export const getAppointments = async (
  token: string
): Promise<AppointmentData[] | null> => {
  try {
    const res = await fetch("/api/appointments", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
};

export const getPatient = async (
  id: string,
  token: string
): Promise<RegisterArgs | null> => {
  try {
    const res = await fetch(`/api/patients/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
};

export const editPatient = async (
  args: RegisterArgs,
  id: string,
  token: string
): Promise<RegisterResponse | null> => {
  try {
    const res = await fetch(`/api/patients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(args),
    });
    if (res.ok) {
      const data = await res.json();
      console.log("Changed:", data);
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
};
