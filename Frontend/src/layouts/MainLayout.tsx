import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Role } from "../services/auth";
import { getId, getRole } from "../services/session";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  const [role] = useState<Role | null>(getRole());
  const [id] = useState<string | null>(getId());
  console.log("Role MainLayout: ", role);
  return (
    <>
      <Navbar />
      <Outlet context={{ role, id }} />
    </>
  );
};

export default MainLayout;
