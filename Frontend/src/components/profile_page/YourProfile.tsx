import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { All } from "../../roles/All";
import Spinner from "../reusable/Spinner";
import { RegisterArgs } from "../forms/RegisterForm";
import Button from "../reusable/Button";

const YourProfile = ({ user }: { user?: All }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const globalParams: { user: All } = useOutletContext();
  const [data, setData] = useState<RegisterArgs | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (user ? user : globalParams.user).getUserInfo().then((d) => {
      console.log(d);
      setData(d);
      setLoading(false);
    });
  }, []);
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <>
      {!user && (
        <h1 className="text-4xl text-sky-700 font-bold my-4">Your Profile</h1>
      )}
      <div className="flex flex-col items-center gap-2">
        {data?.imageUrl && (
          <div
            className="w-1/2 h-1/2 max-w-[300px] max-h-[300px] min-w-[100px] min-h-[100px] aspect-square rounded-full bg-center  bg-contain bg-no-repeat  border-2 border-sky-700"
            style={{ backgroundImage: `url(${data.imageUrl})` }}
          ></div>
        )}
        {data?.name && (
          <div>
            <span className="text-xl font-bold my-4">{data.name}</span>
          </div>
        )}
        {data?.email && (
          <div>
            <span>Email: {data.email}</span>
          </div>
        )}
        {data?.phoneNumber && (
          <div>
            <span>Phone Number: {data.phoneNumber}</span>
          </div>
        )}
        {data?.medicalHistory && (
          <div>
            <span>Medical History: {data.medicalHistory}</span>
          </div>
        )}

        {data?.specialization && (
          <div>
            <span>Specialization: {data.specialization}</span>
          </div>
        )}
        {data?.salary && (
          <div>
            <span>Salary: ${data.salary}</span>
          </div>
        )}
        {data?.hireDate && (
          <div>
            <span>Hire Date: {data.hireDate}</span>
          </div>
        )}
      </div>
      {!user && (
        <div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate("/edit-profile");
            }}
          >
            Edit Profile
          </Button>
        </div>
      )}
    </>
  );
};

export default YourProfile;
