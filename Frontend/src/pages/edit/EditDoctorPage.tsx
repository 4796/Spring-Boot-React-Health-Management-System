import { useOutletContext, useParams } from "react-router-dom";
import Container from "../../components/reusable/Container";
import EditDoctorForm from "../../components/forms/EditDoctorForm";
import { Admin } from "../../roles/Admin";
import H1 from "../../components/reusable/h/H1";

const EditDoctorPage = () => {
  const globalParams: { user: Admin } = useOutletContext();
  const { id } = useParams();

  return (
    <Container>
      <H1>Edit Profile</H1>
      <EditDoctorForm
        doctorId={id ? id : ""}
        sendData={globalParams.user.changeDoctorSalary.bind(globalParams.user)}
        className="flex flex-col items-start gap-4 my-4 [&>div]:w-full"
      />
    </Container>
  );
};

export default EditDoctorPage;
