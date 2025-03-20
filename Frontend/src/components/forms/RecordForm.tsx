import { useNavigate } from "react-router-dom";
import Button from "../reusable/Button";

import { FormEvent, useState } from "react";
import { MedicalHistoryType } from "../MedicalHistoryListing";
import { getId } from "../../services/session";

// export type MedicalHistoryType = {
//   id?: number;
//   patientId: number;
//   doctorId: number;
//   diagnosis: string;
//   treatment: string;
//   medications: string;
//   recordDate: string;
// };
const RecordForm = ({
  patientId,
  oldArgs,
  className,
  sendData,
}: {
  patientId: string;
  oldArgs?: MedicalHistoryType;
  className?: string;
  sendData: (args: MedicalHistoryType) => Promise<boolean | null>;
}) => {
  const navigate = useNavigate();
  const [diagnosis, setDiagnosis] = useState<string>(
    oldArgs?.diagnosis ? oldArgs.diagnosis : ""
  );
  const [treatment, setTreatment] = useState<string>(
    oldArgs?.treatment ? oldArgs.treatment : ""
  );
  const [medications, setMedications] = useState<string>(
    oldArgs?.medications ? oldArgs.medications : ""
  );

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirm("Are you sure you want to submit this data?")) {
      const record: MedicalHistoryType = {
        id: oldArgs?.id,
        patientId: Number(patientId),
        doctorId: Number(getId()),
        // form
        diagnosis,
        treatment,
        medications,
      };

      sendData(record);
      navigate(-1);
    }
  };

  return (
    <form onSubmit={submitForm} className={className}>
      <div>
        <label htmlFor="diagnosis">Diagnosis: </label>
        <input
          type="text"
          id="diagnosis"
          placeholder="Diagnosis"
          className="w-full border-black border-[1px] rounded-md p-1"
          onChange={(e) => setDiagnosis(e.target.value)}
          value={diagnosis}
          required
        />
      </div>
      <div>
        <label htmlFor="treatment">Treatment: </label>
        <input
          type="text"
          id="treatment"
          placeholder="Treatment"
          className="w-full border-black border-[1px] rounded-md p-1"
          onChange={(e) => setTreatment(e.target.value)}
          value={treatment}
          required
        />
      </div>
      <div>
        <label htmlFor="medications">Medications: </label>
        <input
          type="text"
          id="medications"
          placeholder="Medications"
          className="w-full border-black border-[1px] rounded-md p-1"
          onChange={(e) => setMedications(e.target.value)}
          value={medications}
          required
        />
      </div>
      <div className="flex justify-between">
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          style="DANGER"
        >
          Cancel
        </Button>
        <Button type="submit">Confirm</Button>
      </div>
    </form>
  );
};

export default RecordForm;
