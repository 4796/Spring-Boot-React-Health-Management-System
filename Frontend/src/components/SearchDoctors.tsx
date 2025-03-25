import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

import { RegisterArgs } from "./forms/RegisterForm";
import SearchForm from "./forms/SearchForm";
import Spinner from "./reusable/Spinner";

import DoctorListingPreview from "./DoctorListingPreview";
import { Patient } from "../roles/Patient";
import { BsArrowDownCircleFill, BsArrowUpCircleFill } from "react-icons/bs";
import ArrowDownFill from "./reusable/icons/ArrowDownFill";
import ArrowUpFill from "./reusable/icons/ArrowUpFill";

const SearchDoctors = () => {
  const [data, setData] = useState<RegisterArgs[]>([]);
  const [currentData, setCurrentData] = useState<RegisterArgs[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showingAll, setShowingAll] = useState<boolean>(false);
  const [thereIsMoreToSee, setThereIsMoreToSee] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const globalParams: { user: Patient } = useOutletContext();

  useEffect(() => {
    globalParams.user.getDoctors().then((d) => {
      setData(d ? d.reverse() : []);
      setCurrentData(d ? d.slice(0, 3) : []);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loading) return;
    const filtered = data
      ? data.filter((d) =>
          (d.specialization ? d.specialization : "")
            .toLowerCase()
            .startsWith(search.toLowerCase())
        )
      : [];
    setThereIsMoreToSee(filtered.length > 3);

    setCurrentData(showingAll ? filtered : filtered.slice(0, 3));
  }, [search, showingAll]);
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <div className="flex flex-col gap-4">
      <SearchForm
        placeholder="Neurologist"
        submitForm={(e) => {
          e.preventDefault();
        }}
        searchQuery={search}
        setSearchQuery={setSearch}
      />
      <div
        className={`grid xl:grid-cols-3 gap-4 ${
          currentData.length === 0 ? "hidden" : ""
        }`}
      >
        {currentData.map(
          (doctor) =>
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
        )}
      </div>
      {thereIsMoreToSee && (
        <div className="self-center">
          <button
            onClick={() => {
              setCurrentData(!showingAll ? data : data.slice(0, 3));
              setShowingAll((prev) => !prev);
            }}
            className="underline self-end place-self-start"
          >
            {!showingAll ? <ArrowDownFill /> : <ArrowUpFill />}
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchDoctors;
