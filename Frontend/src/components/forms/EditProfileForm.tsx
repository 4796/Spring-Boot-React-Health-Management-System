import { FormEvent, useRef, useState } from "react";

import { RegisterArgs } from "./../forms/RegisterForm";
import { useNavigate, useOutletContext } from "react-router-dom";
import { All } from "../../roles/All";
import Button from "../reusable/Button";

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
  const globalParams: { user: All } = useOutletContext();
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
  };

  return (
    <form ref={formRef} onSubmit={submitForm} className={className}>
      {globalParams.user.getRole() === "ROLE_PATIENT" && (
        <>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              maxLength={30}
              type="text"
              id="name"
              placeholder="John Doe"
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
              placeholder="Operations, allergies..."
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
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
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
          <Button onClick={handleManualSubmit} confirm={true} type="submit">
            Confirm Changes
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
