import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getId, getRole, getToken } from "../services/session";
import Navbar from "../components/Navbar";
import { Patient } from "../roles/Patient";
import { Doctor } from "../roles/Doctor";
import { All } from "../roles/All";
import { Admin } from "../roles/Admin";
import { ToastContainer } from "react-toastify";
import Container from "../components/reusable/Container";

const MainLayout = () => {
  let userObj: All | null = null;
  switch (getRole()) {
    case "ROLE_PATIENT":
      userObj = new Patient(getId(), getToken());
      break;
    case "ROLE_DOCTOR":
      userObj = new Doctor(getId(), getToken());
      break;
    case "ROLE_ADMIN":
      userObj = new Admin(getId(), getToken());
      break;
    default:
      userObj = new Patient(getId(), getToken());
  }
  console.log("Main Layout:", userObj);
  // scroll to top when changing page
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [user] = useState<All>(userObj);

  const [blockingOverlay, setBlockingOverlay] = useState<boolean>(false);
  return (
    <>
      {blockingOverlay && (
        <div className="fixed inset-0 bg-dark bg-opacity-30 z-10"></div>
      )}
      <Navbar />
      <Container styleCssOverride=" ">
        <div className="relative">
          <ToastContainer
            className={"container max-w-[1000px] my-0 mx-auto absolute z-20"}
          />
        </div>
      </Container>
      <Outlet context={{ user, setBlockingOverlay }} />
    </>
  );
};

export default MainLayout;
