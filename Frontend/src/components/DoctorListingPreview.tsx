import { RegisterArgs } from "./forms/RegisterForm";

const DoctorListingPreview = ({
  subjectData,
}: {
  subjectData: RegisterArgs | null | undefined;
}) => {
  return (
    <div className="border-black bg-neutral-100 border-[1px] p-4 rounded-md flex xl:flex-row-reverse flex-col xl:text-left text-center justify-between  items-center my-4">
      <div
        className="border-black w-1/2 h-1/2 max-w-[100px] max-h-[100px] min-w-[50px] min-h-[50px] aspect-square rounded-full bg-center bg-contain bg-no-repeat border-[1px] "
        style={{ backgroundImage: `url(${subjectData?.imageUrl})` }}
      ></div>
      <div className="w-full">
        <div className="font-bold">{subjectData?.name}</div>
        <hr className="border-black" />
        <div>{subjectData?.specialization}</div>
      </div>
    </div>
  );
};

export default DoctorListingPreview;
