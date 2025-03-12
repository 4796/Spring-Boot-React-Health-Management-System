import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import EditProfileForm from "../components/EditProfileForm";
import { editPatient, getPatient } from "../services/api_calls";
import { useOutletContext } from "react-router-dom";
import { RegisterArgs } from "../components/RegisterForm";
import { Role } from "../services/auth";
import { getToken } from "../services/session";
import Spinner from "../components/Spinner";

const EditProfilePage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [oldArgs, setOldArgs] = useState<RegisterArgs | null>(null);
  const globalParams: { id: string; role: Role } = useOutletContext();
  useEffect(() => {
    getPatient(globalParams.id, getToken()).then((old_args) => {
      setOldArgs(old_args);
      setLoading(false);
    });
  }, []);
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <Container>
      <h1 className="text-4xl text-sky-700 font-bold my-4">Edit Profile</h1>
      <EditProfileForm
        sendData={editPatient}
        oldArgs={oldArgs}
        className="flex flex-col items-start gap-4 my-4 [&>div]:w-full"
      />
    </Container>
  );
};

export default EditProfilePage;
