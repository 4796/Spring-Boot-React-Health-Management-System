import { FormEvent, useState } from "react";
import { RegisterArgs } from "./../forms/RegisterForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MyForm from "../reusable/forms/MyForm";

const EditDoctorForm = ({
  sendData,
  oldArgs,
  className,
}: {
  sendData: (
    doctorId: string,
    percentage: number,
    sign: "+" | "-"
  ) => Promise<boolean>;
  oldArgs: RegisterArgs | null;
  className?: string;
}) => {
  const [salary, setSalary] = useState<number>(
    oldArgs?.salary ? oldArgs.salary : 0
  );
  const navigate = useNavigate();
  // submiting

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (salary <= 0) {
      toast.error("Invalid salary.");
      return;
    }
    const oldSalary = oldArgs && oldArgs.salary ? oldArgs.salary : 1;
    const percentage = ((salary - oldSalary) * 100) / oldSalary;
    sendData(
      oldArgs ? "" + oldArgs.id : "",
      percentage * Math.sign(percentage),
      percentage > 0 ? "+" : "-"
    ).then((d) => {
      if (d) {
        toast.success("Salary changed successfully.");
        navigate(-1);
      } else toast.success("Invalid salary.");
    });
  };

  return (
    <MyForm submitText="Change" onSubmit={submitForm} className={className}>
      <div>
        <label htmlFor="salary">New Salary [$]: </label>
        <input
          type="number"
          id="salary"
          placeholder="$1000"
          onChange={(e) => setSalary(Number(e.target.value))}
          value={salary}
          required
        />
      </div>
    </MyForm>
  );
};

export default EditDoctorForm;
