import { data, useOutletContext } from "react-router-dom";

import Listings from "./reusable/Listings";
import { Admin } from "../roles/Admin";
import { useEffect, useState } from "react";
import UserListing from "./UserListing";
import { Role } from "../services/auth";
import H2 from "./reusable/h/H2";
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
  return (
    <>
      <H2>Admins</H2>
      <Listings
        useEffectFunction={() => {}}
        loading={loading}
        minListingsToShow={3}
        data={data ? data[0] : []}
        noDataText="No admins."
        mapFunction={(user) => <UserListing data={user} key={user.id} />}
      />
      <H2>Patients</H2>

      <Listings
        useEffectFunction={() => {}}
        loading={loading}
        minListingsToShow={3}
        data={data ? data[1] : []}
        noDataText="No patients."
        mapFunction={(user) => <UserListing data={user} key={user.id} />}
      />
      <H2>Doctors</H2>

      <Listings
        useEffectFunction={() => {}}
        loading={loading}
        minListingsToShow={3}
        data={data ? data[2] : []}
        noDataText="No doctors."
        mapFunction={(user) => <UserListing data={user} key={user.id} />}
      />
    </>
  );
};

export default UserListings;
