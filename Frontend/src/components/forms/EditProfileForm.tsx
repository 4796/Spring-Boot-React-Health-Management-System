import { FormEvent, useState } from "react";
import { RegisterArgs } from "./../forms/RegisterForm";
import { useNavigate, useOutletContext } from "react-router-dom";
import { All } from "../../roles/All";
import { toast } from "react-toastify";
import MyForm from "../reusable/forms/MyForm";

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
    sendData(data).then((d) => {
      if (d) {
        toast.success("Data changed successfully.");
        navigate(-1);
      } else toast.success("Invalid data.");
    });
  };

  return (
    <MyForm submitText="Change" onSubmit={submitForm} className={className}>
      <>
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
        {globalParams.user.getRole() === "ROLE_PATIENT" && (
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
        )}
      </>
    </MyForm>
  );
};

export default EditProfileForm;
