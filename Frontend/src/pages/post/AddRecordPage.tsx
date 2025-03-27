import { useOutletContext, useParams } from "react-router-dom";
import RecordForm from "../../components/forms/RecordForm";
import { Doctor } from "../../roles/Doctor";
import Container from "../../components/reusable/Container";
import H1 from "../../components/reusable/h/H1";

const AddRecordPage = () => {
  const { id } = useParams();
  const globalParams: { user: Doctor } = useOutletContext();

  return (
    <Container>
      <H1>Add Record</H1>
      <RecordForm
        sendData={globalParams.user.makeMedicalRecord.bind(globalParams.user)}
        patientId={id ? id : ""}
        className="flex flex-col items-start gap-4 my-4 [&>div]:w-full"
      />
    </Container>
  );
};

export default AddRecordPage;
