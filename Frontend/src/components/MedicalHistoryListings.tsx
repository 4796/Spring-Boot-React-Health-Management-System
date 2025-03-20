import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { All } from "../roles/All";

import Listings from "./reusable/Listings";
import MedicalHistoryListing, {
  MedicalHistoryType,
} from "./MedicalHistoryListing";
import { Patient } from "../roles/Patient";

const MedicalHistoryListings = ({
  patient,
  doctorId = "",
}: {
  patient?: Patient;
  doctorId?: string;
}) => {
  const [data, setData] = useState<MedicalHistoryType[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const globalParams: { user: All } = useOutletContext();
  return (
    <Listings
      useEffectFunction={() => {
        (patient ? patient : globalParams.user)
          .getMedicalRecords()
          .then((d: MedicalHistoryType[] | null) => {
            //setData(d ? d.slice(0, 1) : []); // for testing
            setData(
              d
                ? d.sort(
                    (a, b) =>
                      Date.parse(b.recordDate ? b.recordDate : "0") -
                      Date.parse(a.recordDate ? a.recordDate : "0")
                  )
                : d
            );
            setLoading(false);
          });
      }}
      loading={loading}
      minListingsToShow={3}
      data={data}
      noDataText="No medical history."
      mapFunction={(record: MedicalHistoryType) => (
        <MedicalHistoryListing
          data={record}
          key={record.id}
          doctorId={doctorId}
        />
      )}
    />
  );
};

export default MedicalHistoryListings;
