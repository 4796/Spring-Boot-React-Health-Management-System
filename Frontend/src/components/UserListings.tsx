import { useOutletContext } from "react-router-dom";

import { Admin } from "../roles/Admin";
import { useEffect, useState } from "react";

import { Role } from "../services/auth";
import H2 from "./reusable/h/H2";
import SearchUsers from "./SearchUsers";
import Spinner from "./reusable/Spinner";
export type UserType = {
  id: number;
  username: string;
  password: string;
  role: Role;
};
const UserListings = () => {
  const [data, setData] = useState<UserType[][] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const globalParams: { user: Admin } = useOutletContext();

  useEffect(() => {
    globalParams.user.getAllUsers().then((d: UserType[] | null) => {
      //setData(d ? d.slice(0, 1) : []); // for testing
      d = d ? d.sort((a, b) => b.id - a.id) : d;
      const admins = d ? d.filter((user) => user.role === "ROLE_ADMIN") : [];
      const patients = d
        ? d.filter((user) => user.role === "ROLE_PATIENT")
        : [];
      const doctors = d ? d.filter((user) => user.role === "ROLE_DOCTOR") : [];
      setData([admins, patients, doctors]);
      setLoading(false);
    });
  }, []);
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <>
      <H2>Admins</H2>

      <SearchUsers data={data ? data[0] : []} />
      <H2>Patients</H2>
      <SearchUsers data={data ? data[1] : []} />

      <H2>Doctors</H2>
      <SearchUsers data={data ? data[2] : []} />
    </>
  );
};

export default UserListings;
