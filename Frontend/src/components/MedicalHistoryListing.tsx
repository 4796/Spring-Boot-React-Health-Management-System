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
const MedicalHistoryListing = ({ data }: { data: MedicalHistoryType }) => {
  console.log(data);
  return (
    <div className="border-[1px] border-black shadow-xl rounded-md p-4 flex flex-col justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold min-h-[3lh]">
          Diagnosis: {data.diagnosis}
        </h1>
        <p>
          <div>Medication: {data.medications}</div>
          <div>Treatment: {data.treatment}</div>
        </p>
        <p>
          <div>Doctor: {data.doctorId}</div>
          <div>Record date: {data.recordDate}</div>
        </p>
      </div>
      <Button style="DANGER_OUTLINE">Delete Record</Button>
    </div>
  );
};

export default MedicalHistoryListing;
