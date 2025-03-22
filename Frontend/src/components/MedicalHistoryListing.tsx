import { useState, useEffect } from "react";
import { Doctor } from "../roles/Doctor";
import { getToken } from "../services/session";
import DoctorListingPreview from "./DoctorListingPreview";
import { RegisterArgs } from "./forms/RegisterForm";
import Button from "./reusable/Button";
import GrayCard from "./reusable/GrayCard";
import { useNavigate } from "react-router-dom";

export type MedicalHistoryType = {
  id?: number;
  patientId: number;
  doctorId: number;
  diagnosis: string;
  treatment: string;
  medications: string;
  recordDate?: string;
};
const MedicalHistoryListing = ({
  data,
  doctorId = "",
}: {
  data: MedicalHistoryType;
  doctorId?: string;
}) => {
  console.log(data);
  const doctor: Doctor = new Doctor("" + data.doctorId, getToken());
  const canDoctorEdit: boolean = doctorId === "" + data.doctorId;
  const isPatient: boolean = doctorId === "";
  const [subjectData, setSubjectData] = useState<RegisterArgs | null>();
  const navigate = useNavigate();
  useEffect(() => {
    doctor.getUserInfo().then((d) => {
      setSubjectData(d);
      console.log(d);
    });
  }, []);
  return (
    <div className="border-[1px] border-black shadow-xl rounded-md p-4 flex flex-col justify-between gap-4">
      <h1 className="text-xl font-bold">Diagnosis: {data.diagnosis}</h1>
      <div className="justify-self-end">
        <div className="grid xl:grid-cols-3 gap-4 ">
          <div className="grid gap-4 xl:col-span-2">
            <GrayCard title="Medications: " content={[data.medications, ""]} />
            <GrayCard title="Treatment: " content={[data.treatment, ""]} />
          </div>
          <div className="flex flex-col gap-4 ">
            <DoctorListingPreview subjectData={subjectData} />
            <GrayCard title="Record date: " content={[data.recordDate]} />
          </div>
        </div>

        <div className="xl:[&>*]:mb-0"></div>
        {!isPatient && (
          <div className="flex flex-col gap-2 [&>*]:w-full mt-4">
            <Button
              onClick={() => {
                navigate(`/edit-record/${data.id}`);
              }}
              style={canDoctorEdit ? "REGULAR_OUTLINE" : "DISABLED_OUTLINE"}
              disabled={!canDoctorEdit}
            >
              Edit Record
            </Button>
            <Button
              onClick={() => {
                if (confirm("Are you sure you want to delete this record?")) {
                  doctor.deleteMedicalRecord("" + data.id);
                  window.location.reload();
                }
              }}
              style={canDoctorEdit ? "DANGER_OUTLINE" : "DISABLED_OUTLINE"}
              disabled={!canDoctorEdit}
            >
              Delete Record
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalHistoryListing;
