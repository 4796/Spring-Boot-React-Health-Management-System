import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MyForm from "../reusable/forms/MyForm";
import Button from "../reusable/Button";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const EditDoctorForm = ({
  sendData,
  doctorId,
  className,
}: {
  sendData: (
    doctorId: string,
    percentage: number,
    sign: "+" | "-"
  ) => Promise<boolean>;
  doctorId: string;
  className?: string;
}) => {
  const [salary, setSalary] = useState<number>(100);

  const navigate = useNavigate();
  // submiting

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //const oldSalary = oldArgs && oldArgs.salary ? oldArgs.salary : 1;
    //const percentage = ((salary - oldSalary) * 100) / oldSalary;
    sendData(
      doctorId,
      Math.abs(salary - 100),
      //percentage * Math.sign(percentage),
      salary - 100 >= 0 ? "+" : "-"
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
        <label htmlFor="salary">Salary Increase/Decrease [%]: </label>
        <div className="flex">
          <Button
            onClick={() => {
              setSalary((prev) => (prev - 5 <= 0 ? prev : prev - 5));
            }}
            style="DANGER"
          >
            <BsArrowLeft className="stroke-1" />
          </Button>
          <input
            className="text-center"
            type="text"
            id="salary"
            onChange={(e) => setSalary(Number(e.target.value))}
            value={salary + "%"}
            disabled
          />
          <Button
            onClick={() => {
              setSalary((prev) => prev + 5);
            }}
            style="GOOD"
          >
            <BsArrowRight className="stroke-1" />
          </Button>
        </div>
      </div>
    </MyForm>
  );
};

export default EditDoctorForm;
