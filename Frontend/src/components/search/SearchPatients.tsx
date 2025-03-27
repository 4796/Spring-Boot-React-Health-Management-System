import { useState, useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Doctor } from "../../roles/Doctor";
import { RegisterArgs } from "../forms/RegisterForm";
import SearchForm from "../reusable/forms/SearchForm";
import PatientListingPreview from "../listing/PatientListingPreview";
import Button from "../reusable/Button";
import { FaSearch } from "react-icons/fa";
import Listings from "../reusable/Listings";

const SearchPatients = () => {
  const [currentData, setCurrentData] = useState<RegisterArgs[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const globalParams: { user: Doctor } = useOutletContext();

  const abortController = useRef<AbortController | null>(null);
  const getPatients = () => {
    // cancel previous request if still pending
    if (abortController.current) {
      abortController.current.abort();
      //debug console.log("Aborting previous.");
    }
    // new controller
    const newAbortController = new AbortController();
    abortController.current = newAbortController;

    setLoading(true);
    globalParams.user
      .getPatients(name, email)
      .then((d) => {
        if (newAbortController.signal.aborted) {
          //debug console.log("Aborted, not setting data!");
          return [];
        }
        setCurrentData(d ? d : []);
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

  return (
    <div className="flex flex-col gap-4">
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

      <Listings
        useEffectFunction={() => {
          //setCurrentData(data);
        }}
        useEffectParams={
          [
            // data
          ]
        }
        loading={loading}
        minListingsToShow={3}
        data={currentData}
        noDataText={""}
        mapFunction={(patient: RegisterArgs) => (
          <Link to={`/patients/${patient?.id}`} key={patient.id}>
            <PatientListingPreview
              subjectData={patient}
              addCssStyle="xl:hover:bg-opacity-5 transition-opacity"
            />
          </Link>
        )}
      />
    </div>
  );
};

export default SearchPatients;
