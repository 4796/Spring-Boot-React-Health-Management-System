import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { MedicalHistoryType } from "../listing/MedicalHistoryListing";
import { getId } from "../../services/session";
import { toast } from "react-toastify";
import MyForm from "../reusable/forms/MyForm";

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

    const record: MedicalHistoryType = {
      id: oldArgs?.id,
      patientId: Number(patientId),
      doctorId: Number(getId()),
      // form
      diagnosis,
      treatment,
      medications,
    };

    sendData(record).then((d) => {
      if (d) {
        toast.success(
          oldArgs ? "Data changed successfully." : "Record added successfully."
        );
        navigate(-1);
      } else toast.success("Invalid data.");
    });
  };

  return (
    <MyForm
      submitText={oldArgs ? "Change" : "Add"}
      onSubmit={submitForm}
      className={className}
    >
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
    </MyForm>
  );
};

export default RecordForm;
