import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { All } from "../../roles/All";
import Spinner from "../reusable/Spinner";
import { RegisterArgs } from "../forms/RegisterForm";
import Button from "../reusable/Button";
import GrayCard from "../reusable/GrayCard";
import H1 from "../reusable/h/H1";

const YourProfile = ({ user }: { user?: All }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const globalParams: { user: All } = useOutletContext();
  const [data, setData] = useState<RegisterArgs | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.getRole() === "ROLE_ADMIN") return;
    (user ? user : globalParams.user).getUserInfo().then((d) => {
      //debug console.log(d);
      setData(d);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <>
      {!user && <H1>Your Profile</H1>}
      <div className="bg-primary bg-opacity-5 p-4 rounded-md flex xl:flex-row-reverse flex-col xl:text-left text-center justify-between items-center gap-4">
        {data?.imageUrl && (
          <div
            className="border-primary border-opacity-30 w-1/2 h-1/2 max-w-[260px] max-h-[260px] min-w-[100px] min-h-[100px] aspect-square rounded-full bg-center bg-contain bg-no-repeat border-[1px] "
            style={{ backgroundImage: `url(${data.imageUrl})` }}
          ></div>
        )}

        <div className="w-full text-left grid gap-4">
          <div>
            {data?.name && (
              <div className="xl:text-left text-center">
                <span className="text-xl font-bold my-4">{data.name}</span>
              </div>
            )}
            <hr />
            {data?.specialization && (
              <div className="xl:text-left text-center">
                {data.specialization}
              </div>
            )}
          </div>
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
        <div className="mt-2">
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
