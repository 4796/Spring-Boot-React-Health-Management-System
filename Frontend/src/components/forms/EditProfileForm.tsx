import { FormEvent, useState } from "react";

import { RegisterArgs } from "./../forms/RegisterForm";
import { useNavigate, useOutletContext } from "react-router-dom";
import { All } from "../../roles/All";

const EditProfileForm = ({
  sendData,
  oldArgs,
  className,
}: {
  sendData: (args: RegisterArgs) => Promise<boolean>;
  oldArgs: RegisterArgs | null;
  className?: string;
}) => {
  const [name, setName] = useState<string>(oldArgs?.name ? oldArgs.name : "");
  const [phone, setPhone] = useState<string>(
    oldArgs?.phoneNumber ? oldArgs.phoneNumber : ""
  );
  // patient only
  const [email, setEmail] = useState<string>(
    oldArgs?.email ? oldArgs.email : ""
  );
  const [medicalHistory, setMedicalHistory] = useState<string>(
    oldArgs?.medicalHistory ? oldArgs.medicalHistory : ""
  );

  //
  const globalParams: { user: All } = useOutletContext();
  const navigate = useNavigate();
  // submiting

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirm("Are you sure you want to apply these changes?")) {
      const data: RegisterArgs = {
        // patient only
        name,
        email,
        medicalHistory,
        // doctor and patient
        phoneNumber: phone,
      };
      sendData(data);
      navigate(-1);
    }
  };

  return (
    <form onSubmit={submitForm} className={className}>
      {globalParams.user.getRole() === "ROLE_PATIENT" && (
        <>
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
            <label htmlFor="medical_history">Medical History: </label>

            <input
              type="text"
              id="medical_history"
              placeholder="Medical History"
              className="w-full border-black border-[1px] rounded-md p-1"
              onChange={(e) => setMedicalHistory(e.target.value)}
              value={medicalHistory}
            />
          </div>
        </>
      )}
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
      <div className="flex justify-between">
        <button
          type="button"
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
