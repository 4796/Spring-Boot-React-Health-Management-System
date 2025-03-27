import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getId, getRole, getToken } from "../services/session";
import Navbar from "../components/Navbar";
import { Patient } from "../roles/Patient";
import { Doctor } from "../roles/Doctor";
import { All } from "../roles/All";
import { Admin } from "../roles/Admin";
import { ToastContainer } from "react-toastify";

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
  //debug console.log("Main Layout:", userObj);
  // scroll to top when changing page
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [user] = useState<All>(userObj);

  return (
    <>
      <Navbar />

      <ToastContainer className={"fixed"} />

      <Outlet context={{ user }} />
    </>
  );
};

export default MainLayout;
