import { useState, useEffect } from "react";
import { Doctor } from "../roles/Doctor";
import { getToken } from "../services/session";
import DoctorListingPreview from "./DoctorListingPreview";
import { RegisterArgs } from "./forms/RegisterForm";
import Button from "./reusable/Button";
import GrayCard from "./reusable/GrayCard";

export type MedicalHistoryType = {
  id: number;
  patientId: number;
  doctorId: number;
  diagnosis: string;
  treatment: string;
  medications: string;
  recordDate: string;
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
  useEffect(() => {
    doctor.getUserInfo().then((d) => {
      setSubjectData(d);
      console.log(d);
    });
  }, []);
  return (
    <div className="border-[1px] border-black shadow-xl rounded-md p-4 flex flex-col justify-between">
      <h1 className="text-xl font-bold">Diagnosis: {data.diagnosis}</h1>
      <div className="justify-self-end">
        <GrayCard title="Medications: " content={[data.medications, ""]} />
        <GrayCard title="Treatment: " content={[data.treatment, ""]} />
        <DoctorListingPreview subjectData={subjectData} />
        <GrayCard title="Record date: " content={[data.recordDate]} />
        {!isPatient && (
          <div className="flex [&>*]:w-full mt-4">
            <Button
              onClick={() => {
                if (confirm("Are you sure you want to delete this record?"))
                  console.log("DELETED");
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
