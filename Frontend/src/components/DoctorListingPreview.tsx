import { RegisterArgs } from "./forms/RegisterForm";

const DoctorListingPreview = ({
  subjectData,
  addCssStyle = "",
}: {
  subjectData: RegisterArgs | null | undefined;
  addCssStyle?: string;
}) => {
  return (
    <div
      className={`border-b-[1px] border-r-[1px] border-primary border-opacity-30 bg-primary bg-opacity-10 p-4 rounded-md flex xl:flex-row-reverse flex-col xl:text-left text-center justify-between  items-center ${addCssStyle}`}
    >
      <div
        className="border-primary border-opacity-30 max-w-[100px] max-h-[100px] min-w-[100px] min-h-[100px] aspect-square rounded-full bg-center bg-contain bg-no-repeat border-[1px] "
        style={{ backgroundImage: `url(${subjectData?.imageUrl})` }}
      ></div>
      <div className="w-full">
        <div className="font-bold">{subjectData?.name}</div>
        <hr />
        <div>{subjectData?.specialization}</div>
      </div>
    </div>
  );
};

export default DoctorListingPreview;
