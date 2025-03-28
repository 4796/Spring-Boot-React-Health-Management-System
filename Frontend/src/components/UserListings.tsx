import { Link, useOutletContext } from "react-router-dom";
import { Admin } from "../roles/Admin";
import { useEffect, useState } from "react";
import { Role } from "../services/auth";
import H2 from "./reusable/h/H2";
import SearchUsers from "./search/SearchUsers";
import Spinner from "./reusable/Spinner";
import Button from "./reusable/Button";
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
  }, [globalParams.user]);
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <>
      <div className="flex items-center justify-between">
        <H2>Admins</H2>
        <Link to="/register-admin" className="inline-block">
          <Button style="GOOD">Register New Admin</Button>
        </Link>
      </div>

      <SearchUsers loading={loading} data={data ? data[0] : []} />
      <H2>Patients</H2>
      <SearchUsers loading={loading} data={data ? data[1] : []} />
      <div className="flex items-center justify-between">
        <H2>Doctors</H2>
        <Link to="/register-doctor" className="inline-block">
          <Button style="GOOD">Register New Doctor</Button>
        </Link>
      </div>
      <SearchUsers loading={loading} data={data ? data[2] : []} />
    </>
  );
};

export default UserListings;
