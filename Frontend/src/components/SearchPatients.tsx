import { useState, useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Doctor } from "../roles/Doctor";
import { RegisterArgs } from "./forms/RegisterForm";
import SearchForm from "./forms/SearchForm";
import Spinner from "./reusable/Spinner";

import PatientListingPreview from "./PatientListingPreview";

const SearchPatients = () => {
  const [data, setData] = useState<RegisterArgs[]>([]);
  const [currentData, setCurrentData] = useState<RegisterArgs[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const globalParams: { user: Doctor } = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    globalParams.user.getPatients().then((d) => {
      setData(d ? d.reverse() : []);
      setCurrentData(d ? d.slice(0, 3) : []);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setCurrentData(
      data
        ? data
            .filter((d) =>
              (d.name ? d.name : "")
                .toLowerCase()
                .startsWith(search.toLowerCase())
            )
            .slice(0, 3)
        : []
    );
  }, [search]);
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <div className="flex flex-col gap-4">
      <SearchForm
        submitForm={(e) => {
          e.preventDefault();
          if (currentData[0]) navigate(`/patients/${currentData[0].id}`);
        }}
        searchQuery={search}
        setSearchQuery={setSearch}
      />

      <div className="grid xl:grid-cols-3 gap-4">
        {currentData.map(
          (patient) =>
            (patient.name ? patient.name : "")
              .toLowerCase()
              .startsWith(search.toLowerCase()) && (
              <Link to={`/patients/${patient?.id}`} key={patient.id}>
                <PatientListingPreview
                  subjectData={patient}
                  addCssStyle="hover:bg-white"
                />
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default SearchPatients;
