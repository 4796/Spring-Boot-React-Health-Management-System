import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { RegisterArgs } from "../forms/RegisterForm";
import SearchForm from "../reusable/forms/SearchForm";
import DoctorListingPreview from "../listing/DoctorListingPreview";
import { Patient } from "../../roles/Patient";
import Listings from "../reusable/Listings";

const SearchDoctors = () => {
  const [data, setData] = useState<RegisterArgs[]>([]);
  const [currentData, setCurrentData] = useState<RegisterArgs[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const globalParams: { user: Patient } = useOutletContext();

  useEffect(() => {
    globalParams.user.getDoctors().then((d) => {
      setData(
        d
          ? d.sort((a, b) => {
              const specA = a.specialization || "";
              const specB = b.specialization || "";
              return specA > specB ? 1 : specA < specB ? -1 : 0;
            })
          : []
      );
      setCurrentData(d ? d : []);
      setLoading(false);
    });
  }, [globalParams.user]);

  return (
    <div className="flex flex-col gap-4">
      <SearchForm
        placeholder="Neurosurgeon"
        searchQuery={search}
        setSearchQuery={setSearch}
        submitForm={(e) => {
          e.preventDefault();
        }}
      />
      <Listings
        useEffectFunction={() => {
          const filtered = data.filter((d) =>
            (d.specialization ? d.specialization : "")
              .toLowerCase()
              .startsWith(search.toLowerCase())
          );
          setCurrentData(filtered);
        }}
        useEffectParams={[search]}
        loading={loading}
        minListingsToShow={3}
        data={currentData}
        noDataText={""}
        mapFunction={(doctor) =>
          (doctor.specialization ? doctor.specialization : "")
            .toLowerCase()
            .startsWith(search.toLowerCase()) && (
            <Link to={`/book-appointment/${doctor?.id}`} key={doctor.id}>
              <DoctorListingPreview
                subjectData={doctor}
                addCssStyle="xl:hover:bg-opacity-5 transition-opacity "
              />
            </Link>
          )
        }
      />
    </div>
  );
};

export default SearchDoctors;
