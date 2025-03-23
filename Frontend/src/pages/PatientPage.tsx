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
      <H1>Patient Profile</H1>
      <YourProfile user={patient} />
      <div className="flex items-center justify-between">
        <H1>Records</H1>
        <Link to={`/add-record/${id}`} className="block">
          <Button style="GOOD">Add Record</Button>
        </Link>
      </div>
      <MedicalHistoryListings
        patient={new Patient(id ? id : "", getToken())}
        doctorId={getId()}
      />
    </Container>
  );
};

export default PatientPage;
