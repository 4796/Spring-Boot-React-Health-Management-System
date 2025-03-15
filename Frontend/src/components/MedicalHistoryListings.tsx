import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { All } from "../roles/All";

import Listings from "./reusable/Listings";
import MedicalHistoryListing, {
  MedicalHistoryType,
} from "./MedicalHistoryListing";

const MedicalHistoryListings = () => {
  const [data, setData] = useState<MedicalHistoryType[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const globalParams: { user: All } = useOutletContext();
  return (
    <Listings
      useEffectFunction={() => {
        globalParams.user
          .getMedicalRecords()
          .then((d: MedicalHistoryType[] | null) => {
            //setData(d ? d.slice(0, 1) : []); // for testing
            setData(d);
            setLoading(false);
          });
      }}
      loading={loading}
      minListingsToShow={3}
      data={data}
      noDataText="No medical history."
      mapFunction={(record) => (
        <MedicalHistoryListing data={record} key={record.id} />
      )}
    />
  );
};

export default MedicalHistoryListings;
