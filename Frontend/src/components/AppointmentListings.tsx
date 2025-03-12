import { useEffect, useState } from "react";
import { getAppointments } from "../services/api_calls";
import { getToken } from "../services/session";
import AppointmentListing, { AppointmentData } from "./AppointmentListing";

const AppointmentListings = () => {
  const [data, setData] = useState<AppointmentData[] | null>([]);
  useEffect(() => {
    getAppointments(getToken()).then((d: AppointmentData[] | null) => {
      setData(d);
    });
  }, []);
  return !data ? (
    <div>No appointments left!</div>
  ) : (
    <div className="grid xl:grid-cols-3 grid-cols-1 gap-4">
      {data.map((appointment) => (
        <AppointmentListing data={appointment} key={appointment.id} />
      ))}
    </div>
  );
};

export default AppointmentListings;
