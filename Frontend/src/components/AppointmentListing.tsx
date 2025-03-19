import { useNavigate, useOutletContext } from "react-router-dom";
import { All } from "../roles/All";
import Button from "./reusable/Button";
import { useEffect, useState } from "react";
import { Doctor } from "../roles/Doctor";
import { getToken } from "../services/session";
import { RegisterArgs } from "./forms/RegisterForm";
import { Patient } from "../roles/Patient";
import DoctorListingPreview from "./DoctorListingPreview";

export type AppointmentData = {
  appointmentTime: string;
  doctorId: number;
  id: number;
  patientId: number;
  type: string;
};
const AppointmentListing = ({ data }: { data: AppointmentData }) => {
  const globalParams: { user: All } = useOutletContext();
  const isDoctor: boolean = globalParams.user.getRole() === "ROLE_DOCTOR";
  const [subjectData, setSubjectData] = useState<RegisterArgs | null>();
  const navigate = useNavigate();

  const subject: Doctor | null = isDoctor
    ? new Patient("" + data.patientId, getToken())
    : new Doctor("" + data.doctorId, getToken());
  useEffect(() => {
    subject.getUserInfo().then((d) => {
      setSubjectData(d);
      console.log(d);
    });
  }, []);
  return (
    <div className="border-[1px] border-black shadow-xl rounded-md p-4 flex flex-col justify-between">
      <h1 className="text-xl font-bold">Appointment for: {data.type}</h1>
      <div className="justify-self-end">
        {isDoctor ? (
          <>
            <div
              onClick={() => {
                navigate(`/patients/${subject.getId()}`);
              }}
              className="cursor-pointer border-[1px] border-sky-700 text-sky-700 p-4 rounded-md my-4"
            >
              <span className="font-bold">Patient: </span>
              {subjectData?.name}

              {/* <hr /> */}
            </div>

            <div className="bg-neutral-100 border-[1px] p-4 rounded-md my-4">
              <span className="font-bold">Contact: </span>
              <hr />
              <div className="pl-4">
                <div>{subjectData?.email}</div>
                <div>{subjectData?.phoneNumber}</div>
              </div>
            </div>

            <div className="bg-neutral-100 border-[1px] p-4 rounded-md my-4">
              <span className="font-bold">Medical History:</span>
              <hr />

              <div className="pl-4">{subjectData?.medicalHistory}</div>
            </div>
          </>
        ) : (
          <DoctorListingPreview subjectData={subjectData} />
        )}
        <div className="bg-neutral-100 border-[1px] p-4 rounded-md my-4">
          <span className="font-bold">For: </span>
          {data.appointmentTime}
          {/* <hr /> */}
        </div>

        <div className="flex [&>*]:w-full mt-4">
          <Button style="DANGER">Cancel Appointment</Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentListing;
