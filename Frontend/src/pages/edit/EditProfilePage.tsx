import { useEffect, useState } from "react";
import Container from "../../components/reusable/Container";
import EditProfileForm from "../../components/forms/EditProfileForm";
import { useOutletContext } from "react-router-dom";
import { RegisterArgs } from "../../components/forms/RegisterForm";
import Spinner from "../../components/reusable/Spinner";
import { All } from "../../roles/All";
import H1 from "../../components/reusable/h/H1";

const EditProfilePage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [oldArgs, setOldArgs] = useState<RegisterArgs | null>(null);
  const globalParams: { user: All } = useOutletContext();
  useEffect(() => {
    globalParams.user.getUserInfo().then((old_args) => {
      setOldArgs(old_args);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <Container>
      <H1>Edit Profile</H1>
      <EditProfileForm
        sendData={globalParams.user.editUserInfo.bind(globalParams.user)}
        oldArgs={oldArgs}
        className="flex flex-col items-start gap-4 my-4 [&>div]:w-full"
      />
    </Container>
  );
};

export default EditProfilePage;
