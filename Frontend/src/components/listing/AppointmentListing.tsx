import { Link, useOutletContext } from "react-router-dom";
import Button from "../reusable/Button";
import { useEffect, useState } from "react";
import { Doctor } from "../../roles/Doctor";
import { getToken } from "../../services/session";
import { RegisterArgs } from "../forms/RegisterForm";
import { Patient } from "../../roles/Patient";
import DoctorListingPreview from "../listing/DoctorListingPreview";
import GrayCard from "../reusable/GrayCard";
import PatientListingPreview from "../listing/PatientListingPreview";

export type AppointmentSuggestions = string[];

export type AppointmentData = {
  appointmentTime?: string;
  doctorId?: number;
  id?: number;
  patientId?: number;
  type?: string;
};
const AppointmentListing = ({ data }: { data: AppointmentData }) => {
  const globalParams: { user: Patient | Doctor } = useOutletContext();
  const isDoctor: boolean = globalParams.user.getRole() === "ROLE_DOCTOR";
  const [subjectData, setSubjectData] = useState<RegisterArgs | null>();

  const subject: Doctor | Patient = isDoctor
    ? new Patient("" + data.patientId, getToken())
    : new Doctor("" + data.doctorId, getToken());
  useEffect(() => {
    subject.getUserInfo().then((d) => {
      setSubjectData(d);
      console.log(d);
    });
  }, []);
  return (
    <div className="bg-primary bg-opacity-5 rounded-md p-4 flex flex-col justify-between">
      <h1 className="text-xl font-bold">Appointment for: {data.type}</h1>
      <div>
        {isDoctor ? (
          <>
            <Link to={`/patients/${subjectData?.id}`}>
              <PatientListingPreview
                subjectData={subjectData}
                addCssStyle="my-4 xl:hover:bg-opacity-5 transition-opacity "
              />
            </Link>
            {/* <GrayCard
              title=""
              content={[
                <span className="flex xl:flex-row flex-col justify-between items-center gap-2">
                  <span className="font-bold">{subjectData?.name}</span>
                  <Link
                    to={`/patients/${subject.getId()}`}
                    className="inline-block w-full [&>*]:w-full xl:w-auto"
                  >
                    <Button>Open</Button>
                  </Link>
                </span>,
              ]}
            /> */}
            {/* 
            <GrayCard
              title="Contact: "
              content={[subjectData?.email, subjectData?.phoneNumber]}
            /> */}
            {/* <GrayCard
              title="Medical History: "
              content={[subjectData?.medicalHistory, ""]}
            /> */}
          </>
        ) : (
          <Link to={`/book-appointment/${subjectData?.id}`}>
            <DoctorListingPreview
              subjectData={subjectData}
              addCssStyle="my-4 xl:hover:bg-opacity-5 transition-opacity"
            />
          </Link>
        )}
        <GrayCard
          title="For: "
          content={[
            data.appointmentTime
              ? data.appointmentTime.slice(0, -3).split("T").join(" ")
              : "",
          ]}
        />

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex [&>*]:w-full mt-4"
        >
          <Button
            // type="submit"
            style="DANGER"
            confirm={true}
            onClick={() => {
              globalParams.user.cancelAppointment(
                "" + (data.id ? data.id : "")
              );
              window.location.reload();
            }}
          >
            Cancel Appointment
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentListing;
