import { useState } from "react";
import AppointmentListing, { AppointmentData } from "./AppointmentListing";
import Listings from "./reusable/Listings";
import { getAppointments } from "../services/api_calls";
import { getToken } from "../services/session";

const AppointmentListings = () => {
  const [data, setData] = useState<AppointmentData[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <Listings
      useEffectFunction={() => {
        getAppointments(getToken()).then((d: AppointmentData[] | null) => {
          // setData(d ? d.slice(0, 1) : []); // for testing
          setData(d);
          setLoading(false);
        });
      }}
      loading={loading}
      minListingsToShow={3}
      data={data}
      noDataText="No appointments left!"
      mapFunction={(appointment) => (
        <AppointmentListing data={appointment} key={appointment.id} />
      )}
    />
  );
};

export default AppointmentListings;
