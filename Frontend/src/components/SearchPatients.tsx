import { useState, useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Doctor } from "../roles/Doctor";
import { RegisterArgs } from "./forms/RegisterForm";
import SearchForm from "./forms/SearchForm";
import Spinner from "./reusable/Spinner";

import PatientListingPreview from "./PatientListingPreview";
import Button from "./reusable/Button";
import { FaSearch } from "react-icons/fa";

const SearchPatients = () => {
  const [data, setData] = useState<RegisterArgs[]>([]);
  const [currentData, setCurrentData] = useState<RegisterArgs[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showingAll, setShowingAll] = useState<boolean>(false);
  const [thereIsMoreToSee, setThereIsMoreToSee] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const globalParams: { user: Doctor } = useOutletContext();
  const navigate = useNavigate();
  const getPatients = () => {
    setLoading(true);
    globalParams.user.getPatients(name, email).then((d) => {
      setData(d ? d.reverse() : []);
      setCurrentData(d ? d.slice(0, 3) : []);
      setLoading(false);
    });
  };

  const submitForm = () => {
    if (name === "" && email === "") {
      if (currentData[0]) navigate(`/patients/${currentData[0].id}`);
    } else {
      setName("");
      setEmail("");
      getPatients();
    }
  };
  useEffect(() => {
    setThereIsMoreToSee(data.length > 3);

    setCurrentData(showingAll ? data : data.slice(0, 3));
  }, [data, showingAll]);
  return (
    <div className="flex flex-col  gap-4">
      <div className="grid gap-4 xl:grid-cols-11">
        <SearchForm
          className="xl:col-span-5"
          placeholder="John Doe"
          submitForm={(e) => {
            e.preventDefault();
            submitForm();
          }}
          searchQuery={name}
          setSearchQuery={setName}
        />
        <SearchForm
          className="xl:col-span-5"
          placeholder="user@mail.com"
          submitForm={(e) => {
            e.preventDefault();
            submitForm();
          }}
          searchQuery={email}
          setSearchQuery={setEmail}
        />
        <Button type="submit" onClick={submitForm}>
          <div className="flex items-center justify-center">
            <FaSearch />
          </div>
        </Button>
      </div>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div
          className={`grid xl:grid-cols-3 gap-4 ${
            data.length === 0 ? "hidden" : ""
          }`}
        >
          {currentData.map((patient) => (
            <Link to={`/patients/${patient?.id}`} key={patient.id}>
              <PatientListingPreview
                subjectData={patient}
                addCssStyle="hover:bg-white"
              />
            </Link>
          ))}
          {thereIsMoreToSee && (
            <button
              onClick={() => {
                setCurrentData(!showingAll ? data : data.slice(0, 3));
                setShowingAll((prev) => !prev);
              }}
              className="underline self-end place-self-start"
            >
              {!showingAll ? "See more..." : "See less."}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPatients;
