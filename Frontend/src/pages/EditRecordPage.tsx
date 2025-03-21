import { useParams, useOutletContext, Navigate } from "react-router-dom";
import { Doctor } from "../roles/Doctor";
import { useEffect, useState } from "react";
import Spinner from "../components/reusable/Spinner";
import { MedicalHistoryType } from "../components/MedicalHistoryListing";
import Container from "../components/reusable/Container";
import RecordForm from "../components/forms/RecordForm";
import { getId } from "../services/session";
import H1 from "../components/reusable/h/H1";

const EditRecordPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [oldArgs, setOldArgs] = useState<MedicalHistoryType | undefined>();
  const globalParams: { user: Doctor } = useOutletContext();

  useEffect(() => {
    globalParams.user.getMedicalRecord(id ? id : "0").then((old_args) => {
      setOldArgs(old_args ? old_args : undefined);

      setLoading(false);
    });
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : oldArgs?.doctorId !== Number(getId()) ? (
    <Navigate to={`/patients/${oldArgs?.patientId}`} replace />
  ) : (
    <Container>
      <H1>Edit Record</H1>
      <RecordForm
        sendData={globalParams.user.editMedicalRecord.bind(globalParams.user)}
        patientId={oldArgs ? "" + oldArgs.patientId : ""}
        oldArgs={oldArgs}
        className="flex flex-col items-start gap-4 my-4 [&>div]:w-full"
      />
    </Container>
  );
};

export default EditRecordPage;
