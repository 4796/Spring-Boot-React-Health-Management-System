import { Link, useParams } from "react-router-dom";
import YourProfile from "../components/profile_page/YourProfile";
import Container from "../components/reusable/Container";
import { Patient } from "../roles/Patient";
import { getId, getToken } from "../services/session";
import Button from "../components/reusable/Button";
import MedicalHistoryListings from "../components/MedicalHistoryListings";
import H1 from "../components/reusable/h/H1";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const patient: Patient = new Patient(id ? id : "", getToken());
  return (
    <Container>
      <div className="flex flex-col gap-4">
        <H1>Patient Profile</H1>
        <YourProfile user={patient} />
        <Link to={`/add-record/${id}`}>
          <Button style="GOOD">Add Record</Button>
        </Link>
        <MedicalHistoryListings
          patient={new Patient(id ? id : "", getToken())}
          doctorId={getId()}
        />
      </div>
    </Container>
  );
};

export default PatientPage;
