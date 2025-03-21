import Container from "../components/reusable/Container";
import ChangeCredentialsForm from "../components/forms/ChangeCredentialsForm";
import { useOutletContext } from "react-router-dom";
import { All } from "../roles/All";
import H1 from "../components/reusable/h/H1";

const ChangeCredentialsPage = () => {
  const globalParams: { user: All } = useOutletContext();
  return (
    <Container>
      <H1>Change Login Credentials</H1>
      <ChangeCredentialsForm
        sendData={globalParams.user.editUserCredentials.bind(globalParams.user)}
        className="flex flex-col items-start gap-4 my-4 [&>div]:w-full"
      />
    </Container>
  );
};

export default ChangeCredentialsPage;
