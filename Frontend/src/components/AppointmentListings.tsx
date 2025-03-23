import { useState } from "react";
import AppointmentListing, { AppointmentData } from "./AppointmentListing";
import Listings from "./reusable/Listings";

import { useOutletContext } from "react-router-dom";
import { All } from "../roles/All";

const AppointmentListings = () => {
  const [data, setData] = useState<AppointmentData[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const globalParams: { user: All } = useOutletContext();
  return (
    <Listings
      useEffectFunction={() => {
        globalParams.user
          .getAppointments()
          .then((d: AppointmentData[] | null) => {
            // setData(d ? d.slice(0, 1) : []); // for testing
            setData(
              d
                ? d.sort(
                    (a, b) =>
                      Date.parse(a.appointmentTime ? a.appointmentTime : "") -
                      Date.parse(b.appointmentTime ? b.appointmentTime : "")
                  )
                : d
            );
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
