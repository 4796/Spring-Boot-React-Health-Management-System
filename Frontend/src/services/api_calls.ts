import { AppointmentData } from "../components/AppointmentListing";

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
