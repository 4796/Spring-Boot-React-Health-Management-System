import { Link, useNavigate } from "react-router-dom";
import Button from "./reusable/Button";
import { UserType } from "./UserListings";

const UserListing = ({
  data,
  addCssStyle = "",
}: {
  data: UserType;
  addCssStyle?: string;
}) => {
  console.log(data);

  return (
    <div
      className={`bg-primary bg-opacity-10 p-4 rounded-md flex xl:flex-row flex-col xl:text-left text-center justify-between items-center ${addCssStyle}`}
    >
      <div className="w-full">
        <div className="font-bold">{data.username}</div>
        <hr />
        <div>Id: {data.id}</div>
        {/* <div>{subjectData?.phoneNumber}</div> */}
      </div>
    </div>
  );
};

export default UserListing;
