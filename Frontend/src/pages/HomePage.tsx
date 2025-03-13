import { useOutletContext } from "react-router-dom";
import AppointmentListings from "../components/AppointmentListings";
import Container from "../components/Container";
import ErrorPage from "./ErrorPage";
import { All } from "../roles/All";

const HomePage = () => {
  const globalParams: { user: All } = useOutletContext();

  return (
    <Container>
      <div>HomePage</div>
      {globalParams.user.getHomePage()}
    </Container>
  );
};

export default HomePage;
