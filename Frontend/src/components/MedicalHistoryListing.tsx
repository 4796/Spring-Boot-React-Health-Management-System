import { useState, useEffect } from "react";
import { Doctor } from "../roles/Doctor";
import { getToken } from "../services/session";
import DoctorListingPreview from "./DoctorListingPreview";
import { RegisterArgs } from "./forms/RegisterForm";
import Button from "./reusable/Button";

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
        <div className="bg-neutral-100 border-[1px] p-4 rounded-md my-4">
          <span className="font-bold">Medications: </span>
          <hr />
          <div className="pl-4">{data.medications}</div>
        </div>
        <div className="bg-neutral-100 border-[1px] p-4 rounded-md my-4">
          <span className="font-bold">Treatment: </span>
          <hr />
          <div className="pl-4">{data.treatment}</div>
        </div>
        <DoctorListingPreview subjectData={subjectData} />
        <div className="bg-neutral-100 border-[1px] p-4 rounded-md my-4">
          <span className="font-bold">Record date: </span>
          {data.recordDate}
          {/* <hr /> */}
        </div>
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
