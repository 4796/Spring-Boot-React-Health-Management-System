import { FormEvent, useState } from "react";

import { RegisterArgs } from "./../forms/RegisterForm";
import { useNavigate, useOutletContext } from "react-router-dom";
import { All } from "../../roles/All";
import Button from "../reusable/Button";

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
      alert("Invalid Salary Number.");
      return;
    }
    if (confirm("Are you sure you want to apply these changes?")) {
      const oldSalary = oldArgs && oldArgs.salary ? oldArgs.salary : 1;
      const percentage = ((salary - oldSalary) * 100) / oldSalary;
      sendData(
        oldArgs ? "" + oldArgs.id : "",
        percentage * Math.sign(percentage),
        percentage > 0 ? "+" : "-"
      );
      navigate(-1);
    }
  };

  return (
    <form onSubmit={submitForm} className={className}>
      <div>
        <label htmlFor="salary">New Salary [$]: </label>
        <input
          type="number"
          id="salary"
          placeholder="$1000"
          className="w-full border-black border-[1px] rounded-md p-1"
          onChange={(e) => setSalary(Number(e.target.value))}
          value={salary}
          required
        />
      </div>
      <div className="flex justify-between">
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          style="DANGER"
        >
          Cancel
        </Button>
        <Button type="submit">Confirm Changes</Button>
      </div>
    </form>
  );
};

export default EditDoctorForm;
