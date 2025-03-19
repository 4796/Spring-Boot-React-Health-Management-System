import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { All } from "../../roles/All";
import Spinner from "../reusable/Spinner";
import { RegisterArgs } from "../forms/RegisterForm";
import Button from "../reusable/Button";
import GrayCard from "../reusable/GrayCard";

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
      <div className="border-[1px] border-black p-4 rounded-md flex xl:flex-row-reverse flex-col xl:text-left text-center justify-between items-center gap-4">
        {data?.imageUrl && (
          <div
            className="border-black w-1/2 h-1/2 max-w-[300px] max-h-[300px] min-w-[100px] min-h-[100px] aspect-square rounded-full bg-center bg-contain bg-no-repeat border-[1px] "
            style={{ backgroundImage: `url(${data.imageUrl})` }}
          ></div>
        )}

        <div className="w-full text-left">
          {data?.name && (
            <div className="xl:text-left text-center">
              <span className="text-xl font-bold my-4">{data.name}</span>
            </div>
          )}
          <hr className="border-black" />
          {data?.specialization && (
            <div className="xl:text-left text-center">
              {data.specialization}
            </div>
          )}
          {data?.email && <GrayCard title="Email: " content={[data.email]} />}
          {data?.phoneNumber && (
            <GrayCard title="Phone Number: " content={[data.phoneNumber]} />
          )}
          {data?.medicalHistory && (
            <GrayCard
              title="Medical History:"
              content={[data.medicalHistory, ""]}
            />
          )}

          {data?.salary && (
            <GrayCard title="Salary: " content={["$" + data.salary]} />
          )}
          {data?.hireDate && (
            <GrayCard title="Hired: " content={[data.hireDate]} />
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
