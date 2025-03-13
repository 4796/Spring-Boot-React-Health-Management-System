import Container from "../components/Container";
import EditAuthForm from "../components/forms/EditAuthForm";
import { editCredentials } from "../services/auth";

const ChangeCredentialsPage = () => {
  return (
    <Container>
      <h1 className="text-4xl text-sky-700 font-bold my-4">
        Change Login Credentials
      </h1>
      <EditAuthForm
        sendData={editCredentials}
        className="flex flex-col items-start gap-4 my-4 [&>div]:w-full"
      />
    </Container>
  );
};

export default ChangeCredentialsPage;
