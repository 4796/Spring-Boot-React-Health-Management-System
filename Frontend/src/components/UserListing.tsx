import { Link, useNavigate } from "react-router-dom";
import Button from "./reusable/Button";
import { UserType } from "./UserListings";

const UserListing = ({ data }: { data: UserType }) => {
  console.log(data);

  return (
    <div className="border-[1px] border-black shadow-xl rounded-md p-4 flex flex-wrap xl:flex-row flex-col xl:items-center justify-between gap-4 ">
      <div>
        <h1 className="text-xl font-bold">{data.username}</h1>
        <div>Id: {data.id}</div>
      </div>
      {data.role !== "ROLE_ADMIN" && (
        <Link
          to={`/users/${data.role}/${data.id}`}
          className="inline-block w-full [&>*]:w-full xl:w-auto"
        >
          <Button>Open</Button>
        </Link>
      )}
      {
        ///         <Button style="DANGER">Delete</Button>
        ///<div>Role: {data.role}</div>
      }
    </div>
  );
};

export default UserListing;
