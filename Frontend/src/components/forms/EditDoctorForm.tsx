import { FormEvent, useRef, useState } from "react";

import { RegisterArgs } from "./../forms/RegisterForm";
import { useNavigate } from "react-router-dom";

import Button from "../reusable/Button";
import { toast } from "react-toastify";

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
  const formRef = useRef<HTMLFormElement>(null);
  const handleManualSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };
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
    );
    navigate(-1);
  };

  return (
    <form ref={formRef} onSubmit={submitForm} className={className}>
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
        <div>
          <Button type="submit" confirm={true} onClick={handleManualSubmit}>
            Confirm Changes
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditDoctorForm;
