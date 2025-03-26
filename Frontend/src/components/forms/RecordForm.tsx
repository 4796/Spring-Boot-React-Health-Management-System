import { useNavigate } from "react-router-dom";
import Button from "../reusable/Button";

import { FormEvent, useRef, useState } from "react";
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
  const formRef = useRef<HTMLFormElement>(null);
  const handleManualSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };
  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
  };

  return (
    <form ref={formRef} onSubmit={submitForm} className={className}>
      <div>
        <label htmlFor="diagnosis">Diagnosis: </label>
        <input
          type="text"
          id="diagnosis"
          placeholder="Diagnosis"
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
        <div>
          <Button onClick={handleManualSubmit} confirm={true} type="submit">
            Confirm
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RecordForm;
