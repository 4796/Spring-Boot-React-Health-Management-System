import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";

import { RegisterArgs } from "../components/forms/RegisterForm";
import Container from "../components/reusable/Container";
import Spinner from "../components/reusable/Spinner";

import { Doctor } from "../roles/Doctor";
import { getToken } from "../services/session";
import EditDoctorForm from "../components/forms/EditDoctorForm";
import { Admin } from "../roles/Admin";
import H1 from "../components/reusable/h/H1";

const EditDoctorPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [oldArgs, setOldArgs] = useState<RegisterArgs | null>(null);
  const globalParams: { user: Admin } = useOutletContext();
  const { id } = useParams();
  const doctor: Doctor = new Doctor("" + id, getToken());
  useEffect(() => {
    doctor.getUserInfo().then((old_args) => {
      setOldArgs(old_args);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <Container>
      <H1>Edit Profile</H1>
      <EditDoctorForm
        sendData={globalParams.user.changeDoctorSalary.bind(globalParams.user)}
        oldArgs={oldArgs}
        className="flex flex-col items-start gap-4 my-4 [&>div]:w-full"
      />
    </Container>
  );
};

export default EditDoctorPage;
