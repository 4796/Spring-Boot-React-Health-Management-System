import { FormEvent, useState } from "react";
import { RegisterResponse, Role } from "../services/auth";
import { RegisterArgs } from "./RegisterForm";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getToken } from "../services/session";

const EditProfileForm = ({
  sendData,
  oldArgs,
  className,
}: {
  sendData: (
    args: RegisterArgs,
    id: string,
    token: string
  ) => Promise<RegisterResponse | null>;
  oldArgs: RegisterArgs | null;
  className?: string;
}) => {
  const [name, setName] = useState<string>(oldArgs?.name ? oldArgs.name : "");
  const [phone, setPhone] = useState<string>(
    oldArgs?.phoneNumber ? oldArgs.phoneNumber : ""
  );
  const [email, setEmail] = useState<string>(
    oldArgs?.email ? oldArgs.email : ""
  );
  const [medicalHistory, setMedicalHistory] = useState<string>(
    oldArgs?.medicalHistory ? oldArgs.medicalHistory : ""
  );

  const globalParams: { id: string; role: Role } = useOutletContext();
  const navigate = useNavigate();
  // submiting

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirm("Are you sure you want to apply these changes?")) {
      const data: RegisterArgs = {
        name,
        phoneNumber: phone,
        email,
        medicalHistory,
      };
      sendData(data, globalParams.id, getToken());
      navigate(-1);
    }
  };

  return (
    <form onSubmit={submitForm} className={className}>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          className="w-full border-black border-[1px] rounded-md p-1"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </div>
      <div>
        <label htmlFor="phone">Phone Number: </label>
        <input
          type="tel"
          id="phone"
          placeholder="+123 4567890"
          className="w-full border-black border-[1px] rounded-md p-1"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          placeholder="user@mail.com"
          className="w-full border-black border-[1px] rounded-md p-1"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Medical History: </label>

        <input
          type="text"
          id="medical_history"
          placeholder="Medical History"
          className="w-full border-black border-[1px] rounded-md p-1"
          onChange={(e) => setMedicalHistory(e.target.value)}
          value={medicalHistory}
        />
      </div>
      <div className="flex justify-between">
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className="bg-red-600 text-white px-4 py-1 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-sky-600 text-white px-4 py-1 rounded-md"
        >
          Confirm Changes
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
