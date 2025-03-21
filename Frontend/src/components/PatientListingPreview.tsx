import { Link } from "react-router-dom";
import { RegisterArgs } from "./forms/RegisterForm";

const PatientListingPreview = ({
  subjectData,
}: {
  subjectData: RegisterArgs | null | undefined;
}) => {
  return (
    <Link
      to={`/patients/${subjectData?.id}`}
      className="hover:bg-white border-black bg-neutral-100 border-[1px] p-4 rounded-md flex xl:flex-row flex-col xl:text-left text-center justify-between  items-center "
    >
      <div className="w-full">
        <div className="font-bold">{subjectData?.name}</div>
        <hr className="border-black" />
        <div>{subjectData?.email}</div>
        {/* <div>{subjectData?.phoneNumber}</div> */}
      </div>
    </Link>
  );
};

export default PatientListingPreview;
