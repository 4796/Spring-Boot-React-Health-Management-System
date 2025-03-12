import { useOutletContext } from "react-router-dom";
import AppointmentListings from "../components/AppointmentListings";
import Container from "../components/Container";

const HomePage = () => {
  const globalParams: { role: string; id: string } = useOutletContext();
  let component = null;
  switch (globalParams.role) {
    case "ROLE_PATIENT":
      component = (
        <>
          <h1 className="text-4xl text-sky-700 font-bold my-4">
            Your Appointments
          </h1>
          <AppointmentListings />
        </>
      );
      break;
    case "ROLE_DOCTOR":
      component = <>Doctor Dashboard.</>;
      break;
    case "ROLE_ADMIN":
      component = <>Admin Dashboard.</>;
      break;
  }
  return (
    <Container>
      <div>HomePage</div>
      {component}
    </Container>
  );
};

export default HomePage;
