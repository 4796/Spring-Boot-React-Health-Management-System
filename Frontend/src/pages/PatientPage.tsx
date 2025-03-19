import { useParams } from "react-router-dom";
import YourProfile from "../components/profile_page/YourProfile";
import Container from "../components/reusable/Container";
import { Patient } from "../roles/Patient";
import { getId, getToken } from "../services/session";
import Button from "../components/reusable/Button";
import MedicalHistoryListings from "../components/MedicalHistoryListings";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const patient: Patient = new Patient(id ? id : "", getToken());
  return (
    <Container>
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl text-sky-700 font-bold my-4">
          Patient Profile
        </h1>
        <YourProfile user={patient} />
        <div>
          <Button style="GOOD">Add Record</Button>
        </div>
        <MedicalHistoryListings
          patient={new Patient(id ? id : "", getToken())}
          doctorId={getId()}
        />
      </div>
    </Container>
  );
};

export default PatientPage;
