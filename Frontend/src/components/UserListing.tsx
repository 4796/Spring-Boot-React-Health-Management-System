import { useNavigate } from "react-router-dom";
import Button from "./reusable/Button";
import { UserType } from "./UserListings";

const UserListing = ({ data }: { data: UserType }) => {
  console.log(data);
  const navigate = useNavigate();
  return (
    <div className="border-[1px] border-black shadow-xl rounded-md p-4 flex flex-wrap xl:flex-row flex-col xl:items-center justify-between gap-4 ">
      <div>
        <h1 className="text-xl font-bold">{data.username}</h1>
        <div>Id: {data.id}</div>
      </div>
      {data.role !== "ROLE_ADMIN" && (
        <Button onClick={() => navigate(`/users/${data.role}/${data.id}`)}>
          Open
        </Button>
      )}
      {
        ///         <Button style="DANGER">Delete</Button>
        ///<div>Role: {data.role}</div>
      }
    </div>
  );
};

export default UserListing;
