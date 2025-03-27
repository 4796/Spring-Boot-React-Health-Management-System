import { useOutletContext, useParams } from "react-router-dom";
import BookAppointmentForm from "../../components/forms/BookAppointmentForm";
import Container from "../../components/reusable/Container";
import H1 from "../../components/reusable/h/H1";
import { Doctor } from "../../roles/Doctor";
import { Patient } from "../../roles/Patient";

const BookAppointmentPage = () => {
  const globalParams: { user: Patient | Doctor } = useOutletContext();
  const { id } = useParams();
  const patientId =
    globalParams.user instanceof Patient
      ? Number(globalParams.user.getId())
      : Number(id);
  const doctorId =
    globalParams.user instanceof Doctor
      ? Number(globalParams.user.getId())
      : Number(id);
  return (
    <Container>
      <H1>Book an Appointment</H1>
      <BookAppointmentForm
        patientId={patientId}
        doctorId={doctorId}
        className="flex flex-col items-start gap-4 my-4 [&>div]:w-full"
        sendData={globalParams.user.bookAppointment.bind(globalParams.user)}
      />
    </Container>
  );
};

export default BookAppointmentPage;
