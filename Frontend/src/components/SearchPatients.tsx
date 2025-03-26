import { useState, useEffect, useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Doctor } from "../roles/Doctor";
import { RegisterArgs } from "./forms/RegisterForm";
import SearchForm from "./forms/SearchForm";
import Spinner from "./reusable/Spinner";

import PatientListingPreview from "./PatientListingPreview";
import Button from "./reusable/Button";
import { FaSearch } from "react-icons/fa";
import { BsArrowDownCircleFill, BsArrowUpCircleFill } from "react-icons/bs";
import ArrowDownFill from "./reusable/icons/ArrowDownFill";
import ArrowUpFill from "./reusable/icons/ArrowUpFill";

const SearchPatients = () => {
  const [data, setData] = useState<RegisterArgs[]>([]);
  const [currentData, setCurrentData] = useState<RegisterArgs[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showingAll, setShowingAll] = useState<boolean>(false);
  const [thereIsMoreToSee, setThereIsMoreToSee] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const globalParams: { user: Doctor } = useOutletContext();

  const abortController = useRef<AbortController | null>(null);
  const getPatients = () => {
    // cancel previous request if still pending
    if (abortController.current) {
      abortController.current.abort();
      console.log("Aborting previous.");
    }
    // new controller
    const newAbortController = new AbortController();
    abortController.current = newAbortController;

    setLoading(true);
    globalParams.user
      .getPatients(name, email)
      .then((d) => {
        if (newAbortController.signal.aborted) {
          console.log("Aborted, not setting data!");
          return [];
        }
        setData(d ? d.reverse() : []);
        setCurrentData(d ? d.slice(0, 3) : []);
      })
      .finally(() => {
        if (!newAbortController.signal.aborted) {
          // finished
          abortController.current = null;
          setLoading(false);
        }
      });
  };

  const submitForm = () => {
    if (name.trim() !== "" || email.trim() !== "") {
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
          <FaSearch className="block" />
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
                addCssStyle="xl:hover:bg-opacity-5 transition-opacity"
              />
            </Link>
          ))}
        </div>
      )}
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

export default SearchPatients;
