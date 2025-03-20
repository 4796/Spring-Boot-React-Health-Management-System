import { useOutletContext, useParams } from "react-router-dom";
import RecordForm from "../components/forms/RecordForm";
import { Doctor } from "../roles/Doctor";
import Container from "../components/reusable/Container";

const AddRecordPage = () => {
  const { id } = useParams();
  const globalParams: { user: Doctor } = useOutletContext();

  return (
    <Container>
      <h1 className="text-4xl text-sky-700 font-bold my-4">Add Record</h1>
      <RecordForm
        sendData={globalParams.user.makeMedicalRecord.bind(globalParams.user)}
        patientId={id ? id : ""}
        className="flex flex-col items-start gap-4 my-4 [&>div]:w-full"
      />
    </Container>
  );
};

export default AddRecordPage;
