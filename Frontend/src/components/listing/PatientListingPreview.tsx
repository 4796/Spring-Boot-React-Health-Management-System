import { RegisterArgs } from "../forms/RegisterForm";

const PatientListingPreview = ({
  subjectData,
  addCssStyle = "",
}: {
  subjectData: RegisterArgs | null | undefined;
  addCssStyle?: string;
}) => {
  return (
    <div
      className={`border-b-[1px] border-r-[1px] border-primary border-opacity-30 bg-primary bg-opacity-10 p-4 rounded-md flex xl:flex-row flex-col xl:text-left text-center justify-between items-center ${addCssStyle}`}
    >
      <div className="w-full">
        <div className="font-bold">{subjectData?.name}</div>
        <hr />
        <div>{subjectData?.email}</div>
        {/* <div>{subjectData?.phoneNumber}</div> */}
      </div>
    </div>
  );
};

export default PatientListingPreview;
