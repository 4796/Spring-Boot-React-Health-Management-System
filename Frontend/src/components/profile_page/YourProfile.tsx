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
      <div className="border-[1px] p-4 rounded-md flex xl:flex-row-reverse flex-col xl:text-left text-center justify-between items-center gap-4">
        {data?.imageUrl && (
          <div
            className="w-1/2 h-1/2 max-w-[300px] max-h-[300px] min-w-[100px] min-h-[100px] aspect-square rounded-full bg-center bg-contain bg-no-repeat border-[1px] "
            style={{ backgroundImage: `url(${data.imageUrl})` }}
          ></div>
        )}

        <div className="w-full">
          {data?.name && (
            <div>
              <span className="text-xl font-bold my-4">{data.name}</span>
              <hr />
            </div>
          )}
          <hr />
          {data?.specialization && <div>{data.specialization}</div>}
          {data?.email && (
            <div className="bg-neutral-100 border-[1px] p-4 rounded-md my-4 text-left">
              <span className="font-bold">Email: </span>
              {data.email}
              {/* <hr /> */}
            </div>
          )}
          {data?.phoneNumber && (
            <div className="bg-neutral-100 border-[1px] p-4 rounded-md my-4 text-left">
              <span className="font-bold">Phone Number: </span>
              {data.phoneNumber}
              {/* <hr /> */}
            </div>
          )}
          {data?.medicalHistory && (
            <div className="bg-neutral-100 border-[1px] p-4 rounded-md my-4 text-left">
              <span className="font-bold">Medical History:</span>
              <hr />

              <div className="pl-4">{data.medicalHistory}</div>
            </div>
          )}

          {data?.salary && (
            <div className="bg-neutral-100 border-[1px] p-4 rounded-md my-4 text-left">
              <span className="font-bold">Salary:</span> ${data.salary}
              {/* <hr /> */}
            </div>
          )}
          {data?.hireDate && (
            <div className="bg-neutral-100 border-[1px] p-4 rounded-md my-4 text-left">
              <span className="font-bold">Hired: </span>
              {data.hireDate}
              {/* <hr /> */}
            </div>
          )}
        </div>
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
