import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Role } from "../services/auth";
import { getId, getRole, getToken, getUsername } from "../services/session";
import Navbar from "../components/Navbar";
import { Patient } from "../roles/Patient";
import { Doctor } from "../roles/Doctor";
import { All } from "../roles/All";
import { Admin } from "../roles/Admin";

const MainLayout = () => {
  let userObj: All | null = null;
  switch (getRole()) {
    case "ROLE_PATIENT":
      userObj = new Patient(getId(), getUsername(), getToken());
      break;
    case "ROLE_DOCTOR":
      userObj = new Doctor(getId(), getUsername(), getToken());
      break;
    case "ROLE_ADMIN":
      userObj = new Admin(getId(), getUsername(), getToken());
      break;
    default:
      userObj = new Patient(getId(), getUsername(), getToken());
  }
  console.log("Main Layout:", userObj);
  const [user] = useState<All>(userObj);
  return (
    <>
      <Navbar />
      <Outlet context={{ user }} />
    </>
  );
};

export default MainLayout;
