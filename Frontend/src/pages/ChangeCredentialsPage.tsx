import Container from "../components/reusable/Container";
import ChangeCredentialsForm from "../components/forms/ChangeCredentialsForm";
import { useOutletContext } from "react-router-dom";
import { All } from "../roles/All";

const ChangeCredentialsPage = () => {
  const globalParams: { user: All } = useOutletContext();
  return (
    <Container>
      <h1 className="text-4xl text-sky-700 font-bold my-4">
        Change Login Credentials
      </h1>
      <ChangeCredentialsForm
        sendData={globalParams.user.editUserCredentials.bind(globalParams.user)}
        className="flex flex-col items-start gap-4 my-4 [&>div]:w-full"
      />
    </Container>
  );
};

export default ChangeCredentialsPage;
