import { useEffect, useState } from "react";
import { getAppointments } from "../services/api_calls";
import { getToken } from "../services/session";
import AppointmentListing, { AppointmentData } from "./AppointmentListing";

const AppointmentListings = () => {
  const [data, setData] = useState<AppointmentData[] | null>([]);
  const [listedAll, setListedAll] = useState<boolean | null>(false);

  useEffect(() => {
    getAppointments(getToken()).then((d: AppointmentData[] | null) => {
      if (d && d.length <= 3) setListedAll(null);
      setData(d);
    });
  }, []);
  return !data || data?.length === 0 ? (
    <div>No appointments left!</div>
  ) : (
    <div>
      <div className="grid xl:grid-cols-3 grid-cols-1 gap-4">
        {(listedAll === true ? data : data.slice(0, 3)).map((appointment) => (
          <AppointmentListing data={appointment} key={appointment.id} />
        ))}
        {listedAll !== null && (
          <button
            className="underline self-end place-self-start"
            onClick={() => setListedAll((prev) => !prev)}
          >
            {listedAll === false ? "See more..." : "See less."}
          </button>
        )}
      </div>
    </div>
  );
};

export default AppointmentListings;
