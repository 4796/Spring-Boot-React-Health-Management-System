import { useOutletContext } from "react-router-dom";
import Container from "../components/reusable/Container";
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
